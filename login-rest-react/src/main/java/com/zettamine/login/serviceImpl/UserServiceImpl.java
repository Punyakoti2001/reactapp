package com.zettamine.login.serviceImpl;

import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;
import javax.sound.midi.SysexMessage;

import org.apache.catalina.User;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.zettamine.login.Exceptions.ResourceAlreadyExistException;
import com.zettamine.login.GlobalExceptions.ResourceNotFoundException;
import com.zettamine.login.dto.EmailDto;
import com.zettamine.login.dto.UserDto;
import com.zettamine.login.dto.UserResponseDto;
import com.zettamine.login.emailservice.EmailService;
import com.zettamine.login.entities.Roles;
import com.zettamine.login.entities.Users;
import com.zettamine.login.mappers.Mapper;
import com.zettamine.login.repository.RolesRepository;
import com.zettamine.login.repository.UsersRepository;
import com.zettamine.login.service.UserService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService 
{
	private UsersRepository userRepository;
	private RolesRepository roleRepository;

	private EmailService emailServices;
	
	@Override
	public Boolean saveUser(UserDto userDto) {
		
		Optional<Users> checkUser  = userRepository.findByEmail(userDto.getEmail());
		
		if(checkUser.isPresent())
		{
		 throw new ResourceAlreadyExistException("Email Already Exist.");
		}
		
		Users user = Mapper.mapToUser(userDto, new Users());
		Optional<Roles> role = roleRepository.findById(userDto.getRoleId());
		if(!role.isPresent())
		{
			throw new ResourceNotFoundException("Role Does Not Found");
		}
		user.setRoles(role.get());
		Users save = userRepository.save(user);
		
		EmailDto emailDto = new EmailDto();
	      emailDto.setEmail(user.getEmail());
	      emailDto.setFName(user.getFirstName());
	      emailDto.setLName(user.getLastName());
	      emailDto.setPassword(user.getTempPwd());
	      emailDto.setSubject("Account Created Successfully");
	      
	      emailServices.sendEmail(emailDto);
		
		return true;
	}

	@Override
	public List<UserResponseDto> fetchAllUsers(Integer userId) {
		
		Users users = userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("No Record with Id "+userId+"."));
		
		List<Users> all = userRepository.findAll();
		
		 boolean remove = all.remove(users);
		 
	    List<UserResponseDto> userDto = Mapper.mapToUserDto(all);
	    
		return userDto;
	}

	@Override
	public UserResponseDto update(UserDto userdto) {
		Users users = userRepository.findByEmail(userdto.getEmail())
				                    .orElseThrow(()->new ResourceNotFoundException("Email Id with "+userdto.getEmail()+" Not Found"));
		Roles role = roleRepository.findById(userdto.getRoleId()).orElseThrow(()->new ResourceNotFoundException("Role Id with "+userdto.getRoleId()+"Not Found"));
		
		Users updatedUser =Mapper.mapUserDtoToUser(userdto,users);
		updatedUser.setRoles(role);
		
		
		Users save = userRepository.save(updatedUser);
		UserResponseDto userDto = Mapper.mapToUserDto(updatedUser, new UserResponseDto());
		return userDto;
	}

	@Override
	@Transactional
	public Boolean deleteUser(Integer userId) {
		
		Users users = userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("No Records with ID "+userId +" Not Found "));
		
		userRepository.delete(users);
		
		return true;
	}

	@Override
	public void unLockUser(Integer userId) {
		
		Users user = userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("No User with Id "+userId));
		
		userRepository.findAll(Sort.by(Sort.Direction.DESC,"userName"));
		
		user.setAttempts(0);
		user.setAccountLock(false);
		Users save = userRepository.save(user);
		
	}

	

}
