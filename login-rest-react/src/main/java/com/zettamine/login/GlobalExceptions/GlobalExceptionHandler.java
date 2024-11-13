package com.zettamine.login.GlobalExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.zettamine.login.Exceptions.ResourceAlreadyExistException;
import com.zettamine.login.dto.LockResponseDto;
import com.zettamine.login.dto.ResponseDto;

@RestControllerAdvice
public class GlobalExceptionHandler 
{
	@ExceptionHandler(ResourceAlreadyExistException.class)
	public ResponseEntity<?> resourceAlreadyExistException(ResourceAlreadyExistException ex)
	{
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ResponseDto(HttpStatus.CONFLICT,ex.getMessage()));
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?>resourceNotFoundException(ResourceNotFoundException ex)
			{
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseDto(HttpStatus.NOT_FOUND,ex.getMessage()));
		
			}
	
	@ExceptionHandler(UserAccountLockException.class)
	public ResponseEntity<?> userAccountLockException(UserAccountLockException ex)
	{
		return ResponseEntity.status(HttpStatus.LOCKED).body(new LockResponseDto(ex.getUserId(),HttpStatus.LOCKED, "Your Account Get Locked"));
	}

}
