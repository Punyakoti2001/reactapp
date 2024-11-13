package com.zettamine.login.mappers;

import java.util.ArrayList;
import java.util.List;

import org.apache.catalina.User;
import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;

import com.zettamine.login.dto.UserDto;
import com.zettamine.login.dto.UserResponseDto;
import com.zettamine.login.entities.Users;

public class Mapper 
{
	public static Users mapToUser(UserDto userDto,Users users)
	{
		users.setFirstName(userDto.getFirstName());
		users.setLastName(userDto.getLastName());
		users.setLoginStatus(0);
		users.setAttempts(0);
		users.setAccountLock(false);
		users.setTempPwd(generatePassayPassword());
		users.setEmail(userDto.getEmail());
		return users;
		
	}
	
	
	
	public static String generatePassayPassword() {

		PasswordGenerator gen = new PasswordGenerator();
		CharacterData lowerCaseChars = EnglishCharacterData.LowerCase;
		CharacterRule lowerCaseRule = new CharacterRule(lowerCaseChars);
		lowerCaseRule.setNumberOfCharacters(2);

		CharacterData upperCaseChars = EnglishCharacterData.UpperCase;
		CharacterRule upperCaseRule = new CharacterRule(upperCaseChars);
		upperCaseRule.setNumberOfCharacters(2);

		CharacterData digitChars = EnglishCharacterData.Digit;
		CharacterRule digitRule = new CharacterRule(digitChars);
		digitRule.setNumberOfCharacters(2);
		

		CharacterData specialChars = new CharacterData() {
			public String getErrorCode() {
				return "cannot generate special characters";
			}

			public String getCharacters() {
				return "!@#$%^&*()_+";
			}
		};
		
		CharacterRule splCharRule = new CharacterRule(specialChars);
		splCharRule.setNumberOfCharacters(2);

		String password = gen.generatePassword(10, splCharRule, lowerCaseRule, upperCaseRule, digitRule);

		return password;
	}



	public static UserResponseDto mapToUserDto(Users user, UserResponseDto userDto) {
		
		userDto.setUserId(user.getUserId());
		userDto.setFirstName(user.getFirstName());
		userDto.setLastName(user.getLastName());
		userDto.setEmail(user.getEmail());
		userDto.setLoginStatus(user.getLoginStatus());
		userDto.setAccountLock(user.isAccountLock());
		userDto.setAttempts(user.getAttempts());
		userDto.setRoleId(user.getRoles().getRoleId());
//		userDto.setRoles(user.getRoles());
		return userDto;
	}



	public static List<UserResponseDto> mapToUserDto(List<Users> allUsers) {
		
		 
		List<UserResponseDto> userList = new ArrayList<>();
		
		for(Users user :allUsers)
		{
			UserResponseDto userResponseDto = new UserResponseDto();
			userResponseDto.setUserId(user.getUserId());
			userResponseDto.setFirstName(user.getFirstName());
			userResponseDto.setLastName(user.getLastName());
			userResponseDto.setEmail(user.getEmail());
			userResponseDto.setAttempts(user.getAttempts());
			userResponseDto.setAccountLock(user.isAccountLock());
			userResponseDto.setRoleId(user.getRoles().getRoleId());
			userResponseDto.setLoginStatus(user.getLoginStatus());
			userResponseDto.setRole(user.getRoles().getRole());
			userList.add(userResponseDto);
				    
		}
		return userList;
	}



	public static Users mapUserDtoToUser(UserDto userdto, Users users) {
		users.setFirstName(userdto.getFirstName());
		users.setLastName(userdto.getLastName());
		return users;
	}

}
