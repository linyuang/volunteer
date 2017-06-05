package com.simple.yuc.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.simple.yuc.entity.Collections;
import com.simple.yuc.entity.Community;
import com.simple.yuc.repository.CollectionsRepository;

@Component
public class CollectionsService {
	
	private static final Logger logger = LoggerFactory.getLogger(CollectionsService.class);
	
	@Autowired
	private CollectionsRepository collectionsRepository;
	
	public void add(Collections collections){
		collectionsRepository.saveAndFlush(collections);
	}
	
	
//	public List<Community> findCommunityByUserId(Long userId,int page,int size,Sort sort){
//		Pageable pageable = new PageRequest(page, size,sort);
//		return collectionsRepository.findCommunityByUserId(userId, pageable);
//	}
	
	
	//根据userId找到组织列表
//	public List<Community> findCommunityByUserId(Long userId){
//		return collectionsRepository.findCommunityByUserId(userId);
//	}
	
	
	//是否存在
	public boolean isExist(Long userId,Long communityId){
		Collections collections = collectionsRepository
				.findCollectionsByUserIdAndCommunityId(userId, communityId);
		
		if(null!=collections){
			return true;
		}
		return false;
	}
	
	
}
