package com.zettamine.login.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.zettamine.login.dto.LoginDto;
import com.zettamine.login.dto.ResetPasswordDto;
import com.zettamine.login.dto.ResponseDto;
import com.zettamine.login.dto.UserDto;
import com.zettamine.login.dto.UserResponseDto;
import com.zettamine.login.service.LoginService;
import com.zettamine.login.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController 
{
	private UserService userService;
	private LoginService loginService;
	
	@PostMapping("/create")
	public ResponseEntity<?> saveUser(@RequestBody @Valid UserDto userDto)
	{
		System.err.println(userDto);
		Boolean saveUser = userService.saveUser(userDto);
		if(saveUser)
		{
			return  ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDto(HttpStatus.CREATED,"Successfully Created"));
		}
		return null;
		
	}
	
	@GetMapping("/fetch-email/{email}")
	public ResponseEntity<?> checkEmail(@PathVariable String email)
	{
		Boolean checkEmail = loginService.checkEmail(email);
		if(checkEmail)
		{
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK,"Email Is Present"));
		}
		return null;
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<?>login(@RequestBody LoginDto loginDto)
	{
		UserResponseDto userResponseDto = loginService.login(loginDto);
		
		return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
	}
	
	
	
	@PostMapping("save-password")
	public ResponseEntity<?>savePassword(@RequestBody ResetPasswordDto resetPass)
	{System.err.println(resetPass.getEmail());
		
		Boolean resetPassword = loginService.resetPassword(resetPass);
		
		if(resetPassword)
		{
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK,"Updated successfully"));
		}
		return null;
		
	}
	
	@PostMapping("/send-email/{email}")
	public ResponseEntity<?> forgetPassword(@PathVariable("email") String email)
	{
		System.err.println(email);
		
		Boolean forgetPasswordEmail = loginService.forgetPasswordEmail(email);
		
		if(forgetPasswordEmail)
		{
			
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK,"Email sent."));
		}
		return null;
	}
	
	
	@GetMapping("/fetch-all/{userId}")
	public ResponseEntity<?> fetchAllUsers(@PathVariable String userId)
	{
//		System.err.println("inside fetchAll method");
		List<UserResponseDto> allUsers = userService.fetchAllUsers(Integer.parseInt(userId));

		return ResponseEntity.status(HttpStatus.OK).body(allUsers);
	}
	
	@PutMapping("/update-user")
	public ResponseEntity<?> updateUser(@RequestBody UserDto userDto)
	{
		UserResponseDto update = userService.update(userDto);
		System.err.println(update);
		return ResponseEntity.status(HttpStatus.OK).body(update);
		
	}
	
	@DeleteMapping("/delete-user/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable String userId)
	{
		Boolean deleteUser = userService.deleteUser(Integer.parseInt(userId));
		if(deleteUser)
		{
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(HttpStatus.OK,"Successfully Deleted"));
		}
		return null;
	}
	
	@GetMapping("/un-lock/{userId}")
	public ResponseEntity<?>unLockAccount(@PathVariable Integer userId)
	{
		System.err.println(userId);
		userService.unLockUser(userId);
		return null;
	}
}
