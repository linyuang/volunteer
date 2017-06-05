package com.simple.yuc.service;

import java.io.File;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.simple.yuc.config.Constans;
import com.simple.yuc.entity.Activity;
import com.simple.yuc.entity.User;
import com.simple.yuc.repository.ActivityRepository;

@Component
public class ActivityService {
	
	private static final Logger logger = LoggerFactory.getLogger(ActivityService.class);
	
	@Autowired
	private ActivityRepository activityrepository;
	
	//发布活动
	public boolean add(Activity activity){
		if(!isExist(activity.getName(), 
				activity.getComId())){
			//移动文件到正式目录
			File file = new File(Constans.PREFIX + Constans.TEMPPATH + activity.getImage());
			File target = new File(Constans.PREFIX + Constans.ACTIVITYPATH + activity.getImage());
			file.renameTo(target);
			
			activityrepository.saveAndFlush(activity);
			return true;
		}
		return false;
	}
	
	
	public Activity findActivityById(Long id){
		return activityrepository.findActivityById(id);
	}
	
	//删除活动
//	public void delete(Activity activity){
//		Activity target = activityrepository.findActivityByNameAndComId(
//				activity.getName(), activity.getComId());
//		activityrepository.delete(target);
//		//同时删除关联
//	}
	
	//返回定数优先级活动
	public List<Activity> findTopByPrioroty(int page,int size,Sort sort){
		Pageable pageable = new PageRequest(page, size,sort);
		Page<Activity> pages = activityrepository.findAll(pageable);
		return pages.getContent();
	}
	
	
	//根据时间排序返回定数活动
	
	
	//返回一个组织的活动列表
	public List<Activity> findAllByCommunity(int page,int size,Sort sort,Long comId){
		Pageable pageable = new PageRequest(page, size,sort);
		Page<Activity> pages = activityrepository.findByComId(comId, pageable);
		return pages.getContent();
	}
	
	//返回所有活动
	public List<Activity> findAll(int page,int size,Sort sort){
		Pageable pageable = new PageRequest(page, size,sort);
		Page<Activity> pages = activityrepository.findAll(pageable);
		return pages.getContent();
	}
	
	
	//返回所有的活动列表
	
	//查找某一个时间段的活动
	
	//组织修改活动
	
	//是否存在这个活动
	//同一个组织和活动名字便认为相同
	public boolean isExist(String name,Long comId){
		Activity activity = activityrepository.findActivityByNameAndComId(name, comId);
		if(activity!=null){
			return true;
		}
		return false;
	}
	
	//修改活动状态
	public boolean updateAble(Long id,String enable){
		Activity activity = activityrepository.findActivityById(id);
		if(null!=activity){
			activity.setEnable(enable);
			activityrepository.saveAndFlush(activity);
			return true;
		}
		return false;
	}
	
	//冻结一个组织下的所有活动
	public int[] setEnableForComId(String enable,String userName,String oldEnable){
		return activityrepository.setEnableForComId(enable, userName, oldEnable);
	}
	
}
