package com.simple.yuc.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.simple.yuc.entity.Authority;
import com.simple.yuc.entity.CommunityAuthority;
import com.simple.yuc.repository.CommunityAuthorityRepository;

@Component
public class CommunityAuthorityService {
	
	private static final Logger logger = LoggerFactory.getLogger(CommunityAuthorityService.class);
	
	@Autowired
	private CommunityAuthorityRepository communityAuthorityRepository;
	
	//增加用户某一项权限
	public boolean save(CommunityAuthority communityAuthority){
		if(!isExist(communityAuthority.getCommunityId(), 
				communityAuthority.getAuthorityId())){
			communityAuthorityRepository.save(communityAuthority);
			return true;
		}
		return false;
	}
	
	//删除用户某一项权限
	public void delete(CommunityAuthority communityAuthority){
		CommunityAuthority target = communityAuthorityRepository.findCommunityAuthorityByCommunityIdAndAuthorityId(
				communityAuthority.getCommunityId(), communityAuthority.getAuthorityId());
		if(null!=target){
			communityAuthorityRepository.delete(target);
		}
	}
	
	
	//删除权限时删除关联
	public void deleteAllByAuthorityId(Long authorityId){
		List<CommunityAuthority> communityAuthorities = 
				communityAuthorityRepository.findAllByAuthorityId(authorityId);
		communityAuthorityRepository.delete(communityAuthorities);
	}
	
	//返回用户所有权限
	public List<Authority> findAllAuthorityByCommunityId(Long communityId){
		return communityAuthorityRepository.findAllAuthorityByCommunityId(communityId);
	}
	
	//是否存在本条记录
	public boolean isExist(Long communityId,Long authorityId){
		CommunityAuthority communityAuthority = 
				communityAuthorityRepository.findCommunityAuthorityByCommunityIdAndAuthorityId(
						communityId, authorityId);
		
		if(null!=communityAuthority){
			return true;
		}
		
		return false;
	}
}
