package com.zettamine.login.serviceImpl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.zettamine.login.GlobalExceptions.ResourceNotFoundException;
import com.zettamine.login.GlobalExceptions.UserAccountLockException;
import com.zettamine.login.dto.LoginDto;
import com.zettamine.login.dto.ResetPasswordDto;
import com.zettamine.login.dto.UserResponseDto;
import com.zettamine.login.emailservice.EmailService;
import com.zettamine.login.entities.Users;
import com.zettamine.login.mappers.Mapper;
import com.zettamine.login.repository.UsersRepository;
import com.zettamine.login.service.LoginService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LoginServiceImpl implements LoginService {

	private UsersRepository usersRepository;
	private EmailService emailService;
	
	@Override
	public Boolean checkEmail(String email) {
		
	Users user= usersRepository.findByEmail(email)
	    .orElseThrow(() -> new ResourceNotFoundException("User with email " + email + " not found"));
	return true;
	}

	@Override
	public UserResponseDto login(LoginDto loginDto) 
	{
		Users user = usersRepository.findByEmail(loginDto.getUserName()).orElseThrow(
				() -> new ResourceNotFoundException("User with email " + loginDto.getUserName() + " not found"));
		
		if(!loginDto.getPassword().equals(user.getPassword()))
		{
			if(user.getAttempts()<=3)
			{
				user.setAttempts(user.getAttempts()+1);
				usersRepository.save(user);
			}
			else
			{
				user.setAccountLock(true);
				usersRepository.save(user);
				throw new UserAccountLockException(user.getUserId());
			}
		}
		
		if (user.getLoginStatus() == 0) {
//			Users loginUser = usersRepository.findByEmailAndTempPwd(loginDto.getUserName(),loginDto.getPassword()).orElseThrow(()->new ResourceNotFoundException("Invalid Password"));
			if (user.getTempPwd().equals(loginDto.getPassword())) {
				UserResponseDto mappedUser = Mapper.mapToUserDto(user, new UserResponseDto());
				return mappedUser;
			}

		}
		else
		{
			Users loginUser = usersRepository.findByEmailAndPassword(loginDto.getUserName(),loginDto.getPassword()).orElseThrow(()->new ResourceNotFoundException("Invalid Password"));
			UserResponseDto mappedObj = Mapper.mapToUserDto(loginUser, new UserResponseDto());
			return mappedObj;
		}

		throw new ResourceNotFoundException("Incorrect Password");
	}

	@Override
	public Boolean resetPassword(ResetPasswordDto resetPass) {
		
		Users user = usersRepository.findByEmail(resetPass.getEmail()).orElseThrow(()->new ResourceNotFoundException("User with email " + resetPass.getEmail() + " not found"));
		
		user.setPassword(resetPass.getPassword());
		user.setLoginStatus(1);
		
		Users save = usersRepository.save(user);
		
		return true;
	}

	@Override
	public Boolean forgetPasswordEmail(String email) {
		
		emailService.forgetPasswordMail(email);
		return true;
		
	}
	
	
	
	
	

	}
