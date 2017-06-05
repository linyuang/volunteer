package com.simple.yuc.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.simple.yuc.config.Constans;
import com.simple.yuc.entity.Apply;
import com.simple.yuc.entity.User;
import com.simple.yuc.exception.Info;
import com.simple.yuc.exception.WideRuntimeException;
import com.simple.yuc.service.ApplyService;

@CrossOrigin
@RestController
@RequestMapping(value = "/apply")
public class ApplyController {
	
	private static final Logger logger = LoggerFactory.getLogger(ApplyController.class);
	
	@Autowired
	private ApplyService applyService;
	
	//申请活动
	@RequestMapping(value="/add",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> add(@RequestParam("json")String json){
		logger.info("add"+ json);
		
		Apply apply = JSON.parseObject(json,Apply.class);
		apply.setEnable("0");//设置为面试未通过
		//用户参与其他活动或正在参与其他活动
		if(applyService.isApply(apply.getUserId(),"0") || 
				applyService.isApply(apply.getUserId(), "1")){
			throw new WideRuntimeException(Constans.APPLY_HASJOIN);
		}
		
		//不能重复申请
		if(!applyService.add(apply)){
			throw new WideRuntimeException(Constans.APPLY_ADDFAILDED);
		}
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_APPLYSERVICE_INFO, new Info(
				Constans.APPLY_ADDSUCCESS, "SUCCESS"));
		return map;
	}
	
	
	//用户取消申请
	@RequestMapping(value="/delete",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> delete(@RequestParam("json")String json){
		logger.info("delete"+ json);
		Apply apply = JSON.parseObject(json,Apply.class);
		if(!applyService.delete(apply.getUserId(), apply.getActId())){
			throw new WideRuntimeException(Constans.APPLY_DELETEFAILDED);
		}
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_APPLYSERVICE_INFO, new Info(
				Constans.APPLY_DELETESUCCESS, "SUCCESS"));
		return map;
	}
	
	
	//面试
	@RequestMapping(value="/interview",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> interview(@RequestParam("json")String json){
		logger.info("interview"+ json);
		
		JSONObject jsonObj = JSON.parseObject(json);
		JSONArray passes = (JSONArray) jsonObj.get("pass");
		JSONArray dispasses = (JSONArray)jsonObj.get("dispass");
		Long actId = Long.valueOf((String) jsonObj.get("actId"));
		
		//修改为正在参加活动状态
		for(int i = 0;i<passes.size();i++){
			Long pass = Long.valueOf((String)passes.get(i));
			Apply apply = applyService.findByUserIdAndActId(Long.valueOf(pass), actId);
			apply.setEnable("1");
			applyService.save(apply);
		}
		
		
		//报名表删除没面试通过的用户
		for(int i = 0;i<dispasses.size();i++){
			Long dispass = Long.valueOf((String)dispasses.get(i));
			applyService.delete(Long.valueOf(dispass), actId);
		}
		
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_APPLYSERVICE_INFO, new Info(
				Constans.APPLY_INTERVIEW, "SUCCESS"));
		return map;
	}
	
	//获取面试名单
	@RequestMapping(value="/getInterview",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> getInterview(@RequestParam("json")String json){
		logger.info("getInterview"+ json);
		
		JSONObject jsonObj = JSON.parseObject(json);
		Long actId = Long.valueOf((String) jsonObj.get("actId"));
		int page = (Integer) jsonObj.get("page");
		int size = (Integer) jsonObj.get("size");
		
		Sort sort = new Sort(Direction.DESC, "id");
		List<User> users = applyService.findUserByActIdAndEnable(actId, "0",page,size,sort);
		
		if(users==null || users.size()==0){
			throw new WideRuntimeException(Constans.APPLY_GETINTERVIEWFAILDED);
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_APPLYSERVICE_APPLY, users);
		map.put(Constans.MAP_APPLYSERVICE_INFO, new Info(
				Constans.APPLY_GETINTERVIEWSUCCESS, "SUCCESS"));
		
		return map;
	}
	
	@ExceptionHandler
	@ResponseStatus(value=HttpStatus.OK)
	public Map<String,Object> applyExceptionHandler(WideRuntimeException e){
		int code = e.getCode();
		String message = "";
		switch(code){
		case Constans.ACTIVITY_ADDFAILDED:message = "重复申请";break;
		case Constans.APPLY_DELETEFAILDED:message = "删除失败";break;
		case Constans.APPLY_GETINTERVIEWFAILDED:message = "获取失败";break;
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_USERSERVICE_INFO, new Info(code, message));
		
		return map;
	}
}
