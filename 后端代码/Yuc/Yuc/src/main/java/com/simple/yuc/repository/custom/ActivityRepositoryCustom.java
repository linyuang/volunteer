package com.simple.yuc.repository.custom;

import java.util.List;

import com.simple.yuc.entity.Activity;


public interface ActivityRepositoryCustom {
	
	List<Activity> findActivityOrderByTime(int size,String enable);
	
	int[] setEnableForComId(String enable,String userName,String oldEnable);
}
