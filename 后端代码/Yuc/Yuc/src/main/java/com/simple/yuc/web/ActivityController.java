package com.simple.yuc.web;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.simple.yuc.config.Constans;
import com.simple.yuc.entity.Activity;
import com.simple.yuc.entity.Content;
import com.simple.yuc.entity.User;
import com.simple.yuc.exception.Info;
import com.simple.yuc.exception.WideRuntimeException;
import com.simple.yuc.service.ActivityService;
import com.simple.yuc.service.ApplyService;
import com.simple.yuc.service.ContentService;
import com.simple.yuc.util.DateUtil;

@CrossOrigin
@RestController
@RequestMapping(value = "/activity")
public class ActivityController{
	
	private static final Logger logger = LoggerFactory.getLogger(ActivityController.class);
	
	@Autowired
	private ActivityService activityService;
	
	@Autowired
	private ContentService contentService;
	
	@Autowired
	private ApplyService applyService;
	
	//上传活动封面、或富文本图片
	@RequestMapping(value="/upload",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> upload(@RequestPart("file") MultipartFile file){
		logger.info("upload");
		try{
			//保存到临时表
			Content content = contentService.save(file);
			Map<String,Object> map = new HashMap<String, Object>();
			map.put(Constans.MAP_ACTIVITYSERVICE_INFO, new Info(
					Constans.ACTIVITY_UPLOADSUCCESS,
					content.getTitle()));
			
			return map;
		}catch(IOException e){
			throw new WideRuntimeException(Constans.ACTIVITY_UPLOADFAILED);
		}
	}
	
	//发布活动
	@RequestMapping(value="/add",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> add(@RequestParam("json")String json){
		logger.info("add"+ json);
		
		Activity activity = JSON.parseObject(json, Activity.class);
		String date = DateUtil.getDate();
		activity.setAddress("");//目前地址不写出来
		activity.setEnable("1");
		activity.setPriority("");
		activity.setTime(date);
		activity.setUrl("");
		if(!activityService.add(activity)){
			throw new WideRuntimeException(Constans.ACTIVITY_ADDFAILDED);
		}
		
		/*如果是富文本则约定在json里面规定一个图片名数组,add需要把图从临时文件夹搬到正式文件夹
		这样activityService的参数就不仅仅只有add(Activity activity)
		而是add(Activity activity,String... url)
		然后再处理文件移动*/
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_ACTIVITYSERVICE_INFO, new Info(
				Constans.ACTIVITY_ADDSUCCESS, "SUCCESS"));
		return map;
	}
	
	//返回一个活动
	@RequestMapping(value="/getActivityById",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> getActivityById(@RequestParam("id")Long id){
		logger.info("getActivityById"+ id);
		
		Map<String,Object> map = new HashMap<String, Object>();
		Activity activity = activityService.findActivityById(id);
		map.put(Constans.MAP_ACTIVITYSERVICE_ACTIVITY, activity);
		map.put(Constans.MAP_ACTIVITYSERVICE_INFO, new Info(
				Constans.ACTIVITY_QUERYBYIDSUCCESS, "SUCCESS"));
		return map;
	}
	
	
	//根据优先级返回活动
	@RequestMapping(value="/findTop",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> getActivityTop(@RequestParam("json")String json){
		logger.info("getActivityTop"+ json);
		JSONObject jsonObj = JSON.parseObject(json);
		int page = (Integer) jsonObj.get("page");
		int size = (Integer) jsonObj.get("size");
		
		Sort sort = new Sort(Direction.DESC, "priority");
		List<Activity> activities = activityService.findTopByPrioroty(page, size, sort);
		Map<String,Object>  map = new HashMap<String, Object>();
		map.put(Constans.MAP_ACTIVITYSERVICE_ACTIVITY, activities);
		map.put(Constans.MAP_ACTIVITYSERVICE_INFO, new Info(
				Constans.ACTIVITY_PRIORITY, "SUCCESS"));
		return map;
	}
	
	
	
	//返回一个组织所有活动
	@RequestMapping(value="/queryByCommunity",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> getActivityByCommunity(@RequestParam("json")String json){
		logger.info("queryByCommunity"+ json);
		JSONObject jsonObj = JSON.parseObject(json);
		int page = (Integer) jsonObj.get("page");
		int size = (Integer) jsonObj.get("size");
		Long comId = Long.valueOf((String) jsonObj.get("comId"));
		
		Sort sort = new Sort(Direction.DESC, "time");
		
		List<Activity> activities = activityService.findAllByCommunity(page, size, sort, comId);
		Map<String,Object>  map = new HashMap<String, Object>();
		map.put(Constans.MAP_ACTIVITYSERVICE_ACTIVITY, activities);
		map.put(Constans.MAP_ACTIVITYSERVICE_INFO, new Info(
				Constans.ACTIVITY_QUERYBYCOMMUNITYSUCCESS, "SUCCESS"));
		return map;
	}
	
	
	//冻结活动
	@RequestMapping(value="/unable",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> unable(@RequestParam("id")Long id){
		logger.info("id"+ id);
		
		if(!activityService.updateAble(id, "0")){
			throw new WideRuntimeException(Constans.ACTIVITY_UNABLEFAILDED);
		}
		
		//删除报名表该活动相关报名
		applyService.deleteByActId(id);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_ACTIVITYSERVICE_INFO, new Info(
				Constans.ACTIVITY_UNABLESUCCESS, "SUCCESS"));
		return map;
	}
	
	//激活活动
	@RequestMapping(value="/enable",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> enable(@RequestParam("id")Long id){
		logger.info("id"+ id);
		
		if(!activityService.updateAble(id, "1")){
			throw new WideRuntimeException(Constans.ACTIVITY_ENABLEFAILDED);
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_ACTIVITYSERVICE_INFO, new Info(
				Constans.ACTIVITY_ENABLESUCCESS, "SUCCESS"));
		return map;
	}
	
	
	//活动结束
	@RequestMapping(value="/finish",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> finish(@RequestParam("id")Long id){
		logger.info("id"+ id);
		
		if(!activityService.updateAble(id, "2")){
			throw new WideRuntimeException(Constans.ACTIVITY_UNABLEFAILDED);
		}
		
		//修改报名表
		applyService.updateAbleByActId(id, "2");
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_ACTIVITYSERVICE_INFO, new Info(
				Constans.ACTIVITY_FINISH, "SUCCESS"));
		return map;
	}
	
	//删除活动
	@RequestMapping(value="/delete",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> delete(@RequestParam("actId")Long actId){
		return null;
	}
	
	//活动列表
	@RequestMapping(value = "/getactivities",method={RequestMethod.POST,RequestMethod.GET})
	public Map<String,Object> getActivities(@RequestParam("json")String json){
		logger.info("getActivities");
		
		JSONObject jsonObj = JSON.parseObject(json);
		int page = (Integer) jsonObj.get("page");
		int size = (Integer) jsonObj.get("size");
		
		Sort sort = new Sort(Direction.DESC, "id");
		List<Activity> activities = activityService.findAll(page, size, sort);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_ACTIVITYSERVICE_ACTIVITY, activities);
		map.put(Constans.MAP_ACTIVITYSERVICE_INFO, new Info(Constans.ACTIVITY_LIST, "SUCCESS"));
		
		return map;
	}
	
	
	@ExceptionHandler
	@ResponseStatus(value=HttpStatus.OK)
	public Map<String,Object> activityExceptionHandler(WideRuntimeException e){
		int code = e.getCode();
		String message = "";
		switch(code){
		case Constans.ACTIVITY_UPLOADFAILED:message = "上传失败";break;
		case Constans.ACTIVITY_ADDFAILDED:message = "发布失败";break;
		case Constans.ACTIVITY_UNABLEFAILDED:message = "冻结失败,不存在此活动";break;
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constans.MAP_ACTIVITYSERVICE_INFO, new Info(code, message));
		
		return map;
	}
	
}