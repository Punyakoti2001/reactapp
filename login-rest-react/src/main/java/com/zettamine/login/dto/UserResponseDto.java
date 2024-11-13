package com.zettamine.login.dto;

import com.zettamine.login.entities.Roles;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class UserResponseDto 
{
	private Integer userId;
	private String firstName;
	private String lastName;
	private String email;
	private Integer loginStatus;
	private boolean accountLock;
	private Integer attempts;
	private Integer roleId;
	private String role;
}
