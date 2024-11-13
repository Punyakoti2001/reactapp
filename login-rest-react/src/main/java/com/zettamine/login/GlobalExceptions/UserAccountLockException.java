package com.zettamine.login.GlobalExceptions;

import lombok.Data;

@Data
public class UserAccountLockException extends RuntimeException 
{
	private String msg ="Your Account Get Locked";
	private Integer userId;
	public UserAccountLockException(Integer userId) {
		this.userId =userId;
	}
		
	
	

}
