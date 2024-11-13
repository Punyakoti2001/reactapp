package com.zettamine.login.emailservice;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.zettamine.login.dto.EmailDto;

import jakarta.activation.URLDataSource;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService 
{
	private JavaMailSender mailSender;
	@Override
	public boolean sendEmail(EmailDto emailDto) {
		String contents = getEmailContents(emailDto.getFName(), emailDto.getLName(), emailDto.getEmail(),emailDto.getPassword());
		String subject = emailDto.getSubject();
		String to = emailDto.getEmail();
		
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setSubject(subject);
			helper.setTo(to);
			helper.setText(contents, true);

			URLDataSource source = new URLDataSource(this.getClass().getResource("/images/logo.jpg"));
			helper.addInline("CompanyLogo", source);
			
			mailSender.send(message);
			return true;
		} catch (Exception ex) {
			System.out.println(ex);
		}
		return false;
	}

	private String getEmailContents(String fname, String lname, String email, String pass) {
		InputStream fis = this.getClass().getClassLoader().getResourceAsStream("email-templates/new-user-mail.html");
		String str=null;
		try {
			str = IOUtils.toString(fis, "UTF-8");
		} catch (IOException e) {
			e.printStackTrace();
		}
		String data = String.format(str, fname, lname, email, pass);
		
		return data;
	}

	
	
	@Override
	public Boolean forgetPasswordMail(String emailId) 
	{
		String contents = getContent(emailId);
		String subject = "Forget Password";
		String to = emailId;
		
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setSubject(subject);
			helper.setTo(to);
			helper.setText(contents, true);

			URLDataSource source = new URLDataSource(this.getClass().getResource("/images/logo.jpg"));
			helper.addInline("CompanyLogo", source);
			
			mailSender.send(message);
			return true;
		} catch (Exception ex) {
			System.out.println(ex);
		}
		return false;
		
		
	}
	
	
	private String getContent(String emailId) 
	{
		 InputStream inputStream = getClass().getClassLoader().getResourceAsStream("email-templates/forget-password-email.jsp");
	        String jspContent = readInputStream(inputStream);

	        
	        Map<String, String> dynamicValues = new HashMap<>();
	        dynamicValues.put("email", emailId);
	        dynamicValues.put("url", "http://localhost:3000/forget-password/"+emailId);
	      
	        jspContent = replacePlaceholders(jspContent, dynamicValues);

	        return jspContent;
	}
	
	
	
	private String readInputStream(InputStream inputStream) {
        StringBuilder contentBuilder = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"))) {
            String line;
            while ((line = br.readLine()) != null) {
                contentBuilder.append(line).append(System.lineSeparator());
            }
        } catch (Exception e) {
            e.printStackTrace();
  
        }
        return contentBuilder.toString();
    }

    private String replacePlaceholders(String content, Map<String, String> dynamicValues) {
        for (Map.Entry<String, String> entry : dynamicValues.entrySet()) {
            String placeholder = "\\$\\{" + entry.getKey() + "\\}";
            content = content.replaceAll(placeholder, entry.getValue());
        }
        return content;
    }
}
