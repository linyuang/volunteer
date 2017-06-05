package com.simple.yuc.exception;

public class WideRuntimeException extends RuntimeException{
	private int code;

	public WideRuntimeException(int code) {
		super();
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}
	
	
}
