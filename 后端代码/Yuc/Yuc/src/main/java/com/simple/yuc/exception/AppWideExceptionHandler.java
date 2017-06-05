package com.simple.yuc.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class AppWideExceptionHandler {

	@ExceptionHandler(YucNotFoundException.class)
	public String handleNotFound() {
		return "error/duplicate";
	}
}
