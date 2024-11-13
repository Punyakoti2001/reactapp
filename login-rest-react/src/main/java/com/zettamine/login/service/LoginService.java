package com.zettamine.login.service;

import com.zettamine.login.dto.LoginDto;
import com.zettamine.login.dto.ResetPasswordDto;
import com.zettamine.login.dto.UserResponseDto;

public interface LoginService 
{
	Boolean checkEmail(String email);
	
	UserResponseDto login(LoginDto loginDto);
	
	Boolean resetPassword(ResetPasswordDto resetPass);
	
	 Boolean forgetPasswordEmail(String email);
	 
	 

}
