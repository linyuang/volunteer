package com.simple.yuc.web;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.simple.yuc.config.Constans;
import com.simple.yuc.entity.Community;
import com.simple.yuc.entity.Content;
import com.simple.yuc.exception.Info;
import com.simple.yuc.exception.WideRuntimeException;
import com.simple.yuc.service.ActivityService;
import com.simple.yuc.service.AdminService;
import com.simple.yuc.service.ApplyService;
import com.simple.yuc.service.CommunityService;
import com.simple.yuc.service.ContentService;
import com.simple.yuc.service.UserService;
import com.simple.yuc.util.HttpUtil;

@CrossOrigin
@RestController
@RequestMapping(value = "/community")
public class CommunityController {
	
	private static final Logger logger = LoggerFactory.getLogger(CommunityController.class);
	
	@Autowired
	private UserService userService;
	@Autowired
	private CommunityService communityService;
	@Autowired
	private AdminService adminService;
	@Autowired
	private ContentService contentService;
	@Autowired
	private ApplyService applyService;
	@Autowired
	private ActivityService activityService;
	
	
	private Map<String, HttpSession> communityMap = new HashMap<String, HttpSession>();
	
	
	//组织注册
	@RequestMapping(value = "/register",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> register(@RequestParam("json")String json) {
		logger.info("register "+ json);
		JSONObject jsonObj = JSON.parseObject(json);
		String userName = (String) jsonObj.get("userName");
		String password = (String) jsonObj.get("password");
		
		Community community = new Community(null, userName, password, 
				"新组织", "", Constans.COMMUNITYHEADPATH, "", "", "19970101", "1","1");
		communityService.register(community);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_USERSERVICE_INFO, new Info(
				Constans.COMMUNITY_REGISTERSUCCESS,"SUCCESS"));
		
		return map;
	}
	
	
	//组织登录
	@RequestMapping(value = "/login",method={RequestMethod.POST,RequestMethod.GET})
	@SendToUser(value="/queue/notifications")
	public Map<String,Object> login(@RequestParam("json")String json,
			HttpServletRequest request,HttpSession session,Principal principal){
		logger.info("login "+ json);
		
		JSONObject jsonObj = JSON.parseObject(json);
		String userName = (String) jsonObj.get("userName");
		String password = (String) jsonObj.get("password");
		String ip = HttpUtil.getIpAddress(request);
		
		//如果账户不存在
		if(!communityService.isExist(userName)){
			throw new WideRuntimeException(Constans.COMMUNITY_NOTEXIST);
		}
		
		//密码错误
		Community target = communityService.login(userName, password, ip);
		if(null==target){
			throw new WideRuntimeException(Constans.COMMUNITY_WRONGPASSWORD);
		}
		
		HttpSession mapSession = communityMap.get(userName);
		if(null!=mapSession && !mapSession.getId().equals(session.getId())){
			communityService.handleLoginContradict(userName);
		}
		communityMap.put(userName, session);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_COMMUNITYSERVICE_COMMUNITY, target);
		map.put(Constans.MAP_COMMUNITYSERVICE_INFO, new Info(
				Constans.COMMUNITY_LOGINSUCCESS,"SUCCESS"));
		
		return map;
	}
	
	
	//失焦检验用户名
	@RequestMapping(value = "/userNameVaild",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> registerUseNameVaild(@RequestParam("userName")String userName){
		logger.info("registerUseNameVaild "+ userName);
		if(userService.isExist(userName) || 
				communityService.isExist(userName) || 
				adminService.isExist(userName)){
			throw new WideRuntimeException(Constans.COMMUNITY_EXIST);
		}
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_COMMUNITYSERVICE_INFO, 
				new Info(Constans.COMMUNITY_REGISTERVAILDSUCCESS,"SUCCESS"));
		return map;
	}
	
	//上传头像
	@RequestMapping(value = "/head",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> uploadHead(@RequestPart("file") MultipartFile file){
		logger.info("uploadHead");
		
		try{
			//保存到临时表
			Content content = contentService.save(file);
			Map<String,Object> map = new HashMap<String, Object>();
			map.put(Constans.MAP_COMMUNITYSERVICE_INFO, new Info(
					Constans.COMMUNITY_UPLOADHEADSUCCESS,
					content.getTitle()));
			
			return map;
		}catch(IOException e){
			throw new WideRuntimeException(Constans.COMMUNITY_UPLOADHEADFAILED);
		}
	}
	
	//修改资料
	@RequestMapping(value = "/update",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> update(@RequestParam("json")String json){
		logger.info("update"+ json);
		
		Community community = JSON.parseObject(json,Community.class);
		community = communityService.update(community);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_COMMUNITYSERVICE_COMMUNITY, community);
		map.put(Constans.MAP_COMMUNITYSERVICE_INFO, new Info(
				Constans.COMMUNITY_UPDATESUCCESS,"SUCCESS"));
		return map;
		
	}
	
	//组织修改密码
	@RequestMapping(value = "/updatePassword",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> updatePassword(@RequestParam("json")String json){
		logger.info("updatePassword"+ json);
		
		JSONObject jsonObj = JSON.parseObject(json);
		String oldPassword = (String) jsonObj.get("oldPassword");
		String userName = (String) jsonObj.get("userName");
		String password = (String) jsonObj.get("password");
		
		boolean flag = communityService.vaildCommunity(userName, oldPassword);
		if(flag){
			communityService.updatePassword(userName, password);
		}else{
			throw new WideRuntimeException(Constans.COMMUNITY_UPDATEPASSWORDFAILED);
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_COMMUNITYSERVICE_INFO, new Info(
				Constans.COMMUNITY_UPDATEPASSWORDSUCCESS, "SUCCESS"));
		
		return map;
	}
	
	//app获取组织列表
	@RequestMapping(value = "/getCommunitiesFromApp",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> getCommunitiesFromApp(@RequestParam("json")String json){
		JSONObject jsonObj = JSON.parseObject(json);
		int page = (Integer) jsonObj.get("page");
		int size = (Integer) jsonObj.get("size");
		
		Sort sort = new Sort(Direction.DESC, "id");
		List<Community> list = communityService.findAllByPage(page, size, sort);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_COMMUNITYSERVICE_COMMUNITY, list);
		map.put(Constans.MAP_COMMUNITYSERVICE_INFO, new Info(
				Constans.COMMUNITY_GETLISTSUCCESS, "SUCCESS"));
		
		return map;
	}
	
	
	//冻结组织
	@RequestMapping(value = "/unable",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> unable(@RequestParam("userName")String userName){
		logger.info("userName"+ userName);
		
		if(!communityService.enable(userName, "0")){
			throw new WideRuntimeException(Constans.COMMUNITY_ABLEFAILDED);
		}
		
		//冻结正在进行的活动
		int[] actIds = activityService.setEnableForComId("0", userName, "1");
		
		//删除报名信息
		applyService.deleteByActId(actIds, new String[]{"0","1"});
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_COMMUNITYSERVICE_INFO, new Info(
				Constans.COMMUNITY_UNABLE, "SUCCESS"));
		
		return map;
	}
	
	//激活
	@RequestMapping(value = "/enable",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> enable(@RequestParam("userName")String userName){
		logger.info("userName"+ userName);
		
		if(!communityService.enable(userName, "1")){
			throw new WideRuntimeException(Constans.COMMUNITY_ABLEFAILDED);
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_COMMUNITYSERVICE_INFO, new Info(
				Constans.COMMUNITY_ENABLE, "SUCCESS"));
		
		return map;
	}
	
	
	
	@RequestMapping(value = "/getCommunity",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> getCommunitiesFromApp(@RequestParam("id")Long id){
		Community community = communityService.getCommunity(id);

		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_COMMUNITYSERVICE_COMMUNITY, community);
		map.put(Constans.MAP_COMMUNITYSERVICE_INFO, new Info(
				Constans.COMMUNITY_FINDOND, "SUCCESS"));

		return map;
	}
	
	
	@ExceptionHandler
	@ResponseStatus(value=HttpStatus.OK)
	public Map<String,Object> communityExceptionHandler(WideRuntimeException e){
		int code = e.getCode();
		String message = "";
		switch(code){
		case Constans.COMMUNITY_NOTEXIST:message = "组织不存在";break;
		case Constans.COMMUNITY_WRONGPASSWORD:message = "密码错误";break;
		case Constans.COMMUNITY_EXIST:message="注册账号已存在";break;
		case Constans.COMMUNITY_UPLOADHEADFAILED:message="上传头像失败";break;
		case Constans.COMMUNITY_UPDATEPASSWORDFAILED:message="修改密码失败";break;
		case Constans.COMMUNITY_ABLEFAILDED:message="处理失败";break;
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_COMMUNITYSERVICE_INFO, new Info(code, message));
		
		return map;
	}
}
