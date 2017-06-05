package com.simple.yuc.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.simple.yuc.repository.ActPhoRepository;

@Component
public class ActPhoService {
	
	private static final Logger logger = LoggerFactory.getLogger(ActPhoService.class);
	
	@Autowired
	private ActPhoRepository actPhoRepository;
	
	//返回一个活动的所有图片
	
	//删除某一张图片的时候删除关联(不删除活动)
	
	//删除某一个活动时删除关联(不删除图片)
	
	//新增活动由客户选择的图片增加关联
	
	
}
