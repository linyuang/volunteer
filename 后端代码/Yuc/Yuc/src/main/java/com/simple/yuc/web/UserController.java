package com.simple.yuc.web;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.simple.yuc.config.Constans;
import com.simple.yuc.entity.User;
import com.simple.yuc.exception.Info;
import com.simple.yuc.exception.WideRuntimeException;
import com.simple.yuc.service.AdminService;
import com.simple.yuc.service.ApplyService;
import com.simple.yuc.service.CommunityService;
import com.simple.yuc.service.UserService;
import com.simple.yuc.util.DateUtil;
import com.simple.yuc.util.HttpUtil;

@CrossOrigin
@RestController
@RequestMapping(value = "/user")
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	@Autowired
	private CommunityService communityService;
	@Autowired
	private AdminService adminService;
	@Autowired
	private ApplyService applyService;
	
	private Map<String, HttpSession> userMap = new HashMap<String, HttpSession>();
	
	
	//用户修改个人资料
	@RequestMapping(value = "/update",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> update(@RequestParam("json")String json) {
		logger.info("update"+ json);

		User user = JSON.parseObject(json, User.class);
		
		if(user==null){System.out.println("null-------------");}
		
		user = userService.update(user);

		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_USERSERVICE_USER, user);
		map.put(Constans.MAP_USERSERVICE_INFO, new Info(
				Constans.USER_UPDATESUCCESS,"SUCCESS"));
		return map;
	}
	
	
	//用户注册
	@RequestMapping(value = "/register",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> register(@RequestParam("json")String json,HttpServletRequest request,HttpSession session) {
		logger.info("register "+ json);
		JSONObject jsonObj = JSON.parseObject(json);
		String userName = (String) jsonObj.get("userName");
		String password = (String) jsonObj.get("password");
		String email = (String) jsonObj.get("email");
		String date = DateUtil.getDate();
		
		User user = new User(null, userName, password, "", "", 
				"", "志愿新人", "1", "19970101", "群众", "", date, "19970101", "", email, "1");
		userService.register(user);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_USERSERVICE_INFO, new Info(
				Constans.USER_REGISTERSUCCESS,"SUCCESS"));
		return map;
	}
	
	//失焦检验邮箱
	@RequestMapping(value = "/emailVaild",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> registerEmailVaild(@RequestParam("email")String email){
		logger.info("registerEmailVaild "+ email);
		
		if(userService.vaildEmail(email)){
			throw new WideRuntimeException(Constans.USER_EMAILEXIST);
		}
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_USERSERVICE_INFO, 
				new Info(Constans.USER_REGISTERVAILDSUCCESS,"SUCCESS"));
		return map;
	}
	
	//失焦检验用户名
	@RequestMapping(value = "/userNameVaild",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> registerUseNameVaild(@RequestParam("userName")String userName){
		logger.info("registerUseNameVaild "+ userName);
		if(userService.isExist(userName) || 
				communityService.isExist(userName) || 
					adminService.isExist(userName)){
			throw new WideRuntimeException(Constans.USER_EXIST);
		}
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_USERSERVICE_INFO, 
				new Info(Constans.USER_REGISTERVAILDSUCCESS,"SUCCESS"));
		return map;
	}
	
	
	//用户登录
	@RequestMapping(value = "/login",method={RequestMethod.POST,RequestMethod.GET})
	@SendToUser(value="/queue/notifications")
	public Map<String,Object> login(@RequestParam("json")String json,
			HttpServletRequest request,HttpSession session,Principal principal){
		System.out.println(request.toString());
		logger.info("login "+ json);
		
		JSONObject jsonObj = JSON.parseObject(json);
		String userName = (String) jsonObj.get("userName");
		String password = (String) jsonObj.get("password");
		String ip = HttpUtil.getIpAddress(request);
		
		//如果账户不存在
		if(!userService.isExist(userName)){
			throw new WideRuntimeException(Constans.USER_NOTEXIST);
		}
		//密码错误
		User target = userService.login(userName, password, ip);
		if(target==null){
			throw new WideRuntimeException(Constans.USER_WRONGPASSWORD);
		}
		
		HttpSession mapSession = userMap.get(userName);
		if(null!=mapSession && !mapSession.getId().equals(session.getId())){
			userService.handleLoginContradict(userName);
		}
		
		userMap.put(userName, session);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_USERSERVICE_USER, target);
		map.put(Constans.MAP_USERSERVICE_INFO, new Info(Constans.USER_LOGINSUCCESS,"SUCCESS"));
		
		return map;
	}
	
	//用户修改密码
	@RequestMapping(value = "/updatePassword",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> updatePassword(@RequestParam("json")String json){
		logger.info("updatePassword"+ json);
		
		JSONObject jsonObj = JSON.parseObject(json);
		String oldPassword = (String) jsonObj.get("oldPassword");
		String userName = (String) jsonObj.get("userName");
		String password = (String) jsonObj.get("password");
		
		boolean flag = userService.vaildUser(userName, oldPassword);
		if(flag){
			userService.update(userName, password);
		}else{
			throw new WideRuntimeException(Constans.USER_UPDATEPASSWORDFAILED);
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_USERSERVICE_INFO, new Info(
				Constans.USER_UPDATEPASSWORDSUCCESS, "SUCCESS"));
		
		return map;
	}
	
	
	//按照名字模糊搜索组织
	
	//冻结用户
	@RequestMapping(value = "/unable",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> unable(@RequestParam("userName")String userName){
		logger.info("unable"+ userName);
		
		if(!userService.enable(userName, "0")){
			throw new WideRuntimeException(Constans.USER_ABLEFAILDED);
		}
		
		//删除用户报名信息
		applyService.deleteByUserIdAndEnable(userName, "0");
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_USERSERVICE_INFO, new Info(
				Constans.USER_UNABLE, "SUCCESS"));
		
		return map;
	}
	
	//激活
	@RequestMapping(value = "/enable",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> enable(@RequestParam("userName")String userName){
		logger.info("unable"+ userName);
		
		if(!userService.enable(userName, "1")){
			throw new WideRuntimeException(Constans.USER_ABLEFAILDED);
		}
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_USERSERVICE_INFO, new Info(
				Constans.USER_ENABLE, "SUCCESS"));
		
		return map;
	}
	
	
	//请求用户列表
	@RequestMapping(value = "/getusers",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> getUsers(@RequestParam("json")String json){
		logger.info("getUsers");
		
		JSONObject jsonObj = JSON.parseObject(json);
		int page = (Integer) jsonObj.get("page");
		int size = (Integer) jsonObj.get("size");
		
		Sort sort = new Sort(Direction.DESC, "id");
		List<User> users = userService.findAllByPage(page, size, sort);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_USERSERVICE_USER, users);
		map.put(Constans.MAP_USERSERVICE_INFO, new Info(
				Constans.USER_USERLISTSUCCESS, "SUCCESS"));
		return map;
	}
	
	
	@ExceptionHandler
	@ResponseStatus(value=HttpStatus.OK)
	public Map<String,Object> userExceptionHandler(WideRuntimeException e){
		int code = e.getCode();
		String message = "";
		switch(code){
		case Constans.USER_NOTEXIST:message = "账户不存在";break;
		case Constans.USER_WRONGPASSWORD:message = "密码错误";break;
		case Constans.USER_EXIST:message="注册账号已存在";break;
		case Constans.USER_EMAILEXIST:message="注册邮箱已存在";break;
		case Constans.USER_UPDATEPASSWORDFAILED:message="修改密码失败";break;
		case Constans.USER_ABLEFAILDED:message="处理失败";break;
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_USERSERVICE_INFO, new Info(code, message));
		
		return map;
	}
}
