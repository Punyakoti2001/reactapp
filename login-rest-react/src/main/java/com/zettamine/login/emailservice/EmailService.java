package com.zettamine.login.emailservice;

import com.zettamine.login.dto.EmailDto;

public interface EmailService 
{
	public boolean sendEmail(EmailDto emailDto);
	
	public Boolean forgetPasswordMail(String emailId);

}
