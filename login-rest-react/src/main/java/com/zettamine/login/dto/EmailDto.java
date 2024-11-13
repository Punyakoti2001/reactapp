package com.zettamine.login.dto;

import lombok.Data;

@Data
public class EmailDto 
{
	private String email;
	private String subject;
	private String fName;
	private String lName;
	private String password;
	private String toMail;

}
