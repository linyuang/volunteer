package com.simple.yuc.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping(value = "/wide")
public class WideController{
	
	private static final Logger logger = LoggerFactory.getLogger(WideController.class);
	
	@RequestMapping(value="/login",method={RequestMethod.POST,RequestMethod.GET})
	public String login(){
		return "login";
	}
	
	
	
	
}