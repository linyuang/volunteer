package com.simple.yuc.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND,reason="404 Not Found")
public class YucNotFoundException extends RuntimeException{

}
