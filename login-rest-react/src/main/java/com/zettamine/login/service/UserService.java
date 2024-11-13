package com.zettamine.login.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.zettamine.login.dto.UserDto;
import com.zettamine.login.dto.UserResponseDto;


public interface UserService 
{
	 Boolean saveUser(UserDto userDto);
	 
	 List<UserResponseDto> fetchAllUsers(Integer userId);
	 
	 UserResponseDto update(UserDto userdto);
	 
	 Boolean deleteUser(Integer userId);

	 void unLockUser(Integer userId);
}
