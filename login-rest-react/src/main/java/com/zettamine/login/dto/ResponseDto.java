package com.zettamine.login.dto;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class ResponseDto
{
//	private Integer userId;
	private HttpStatus status;
	private String message;

}
