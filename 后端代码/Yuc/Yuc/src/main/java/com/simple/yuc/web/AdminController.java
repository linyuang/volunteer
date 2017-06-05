package com.simple.yuc.web;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.simple.yuc.config.Constans;
import com.simple.yuc.entity.Admin;
import com.simple.yuc.exception.Info;
import com.simple.yuc.exception.WideRuntimeException;
import com.simple.yuc.service.AdminService;

@CrossOrigin
@RestController
@RequestMapping(value = "/admin")
public class AdminController {
	
	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	private AdminService adminService;

	//管理员登录
	@RequestMapping(value = "/login",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> login(String json){
		logger.info("login "+ json);
		
		JSONObject jsonObj = JSON.parseObject(json);
		String userName = jsonObj.getString("userName");
		String password = jsonObj.getString("password");
		
		if(!adminService.isExist(userName)){
			throw new WideRuntimeException(Constans.ADMIN_NOTEXIST);
		}
		
		if(!adminService.isENable(userName)){
			throw new WideRuntimeException(Constans.ADMIN_UNABLE);
		}
		
		Admin admin = adminService.login(userName, password);
		if(null==admin){
			throw new WideRuntimeException(Constans.ADMIN_WRONGPASSWORD);
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_ADMINSERVICE_ADMIN, admin);
		map.put(Constans.MAP_ADMINSERVICE_INFO, new Info(
				Constans.ADMIN_LOGINSUCCESS, "SUCCESS"));
		
		return map;
	}
	
	
	
	@ExceptionHandler
	@ResponseStatus(value=HttpStatus.OK)
	public Map<String,Object> communityExceptionHandler(WideRuntimeException e){
		int code = e.getCode();
		String message = "";
		switch(code){
		case Constans.ADMIN_NOTEXIST:message = "账户不存在";break;
		case Constans.ADMIN_UNABLE:message = "账号已冻结";break;
		case Constans.ADMIN_WRONGPASSWORD:message = "密码错误";break;
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_COMMUNITYSERVICE_INFO, new Info(code, message));
		
		return map;
	}
}
