package com.simple.yuc.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.simple.yuc.entity.Authority;
import com.simple.yuc.repository.AuthorityRepository;

@Component
public class AuthorityService {
	//DEFAULT:管理组织、用户、以及活动、人工审核活动照片、用户、组织头像、消息
	//ROOT:能对管理员以及管理员权限进行管理
	
	private static final Logger logger = LoggerFactory.getLogger(AuthorityService.class);
	
	@Autowired
	private AuthorityRepository authorityRepository;
	
	@Autowired
	private AdminAuthorityService adminAuthorityService;
	@Autowired
	private UserAuthorityService userAuthorityService;
	@Autowired
	private CommunityAuthorityService communityAuthorityService;
	
	//增加权限
	public boolean addAuthority(Authority authority){
		if(!isExist(authority.getName())){
			authorityRepository.saveAndFlush(authority);
			return true;
		}
		return false;
	}
	
	//删除权限
	public void deleteAuthority(String name){
		Authority authority = authorityRepository.findAuthorityByName(name);
		authorityRepository.delete(authority);
		//同时清除用户权限表的关联
		adminAuthorityService.deleteAllByAuthorityId(authority.getId());
		userAuthorityService.deleteAllByAuthorityId(authority.getId());
		communityAuthorityService.deleteAllByAuthorityId(authority.getId());
	}
	
	//修改权限名字
	public Authority update(String name,String newName){
		Authority authority = authorityRepository.findAuthorityByName(name);
		authority.setName(newName);
		authority = authorityRepository.saveAndFlush(authority);
		return authority;
	}
	
	
	//根据名字返回权限id
	public Long findIdByName(String name){
		Authority authority = authorityRepository.findAuthorityByName(name);
		return authority.getId();
	}
	
	public boolean isExist(String name){
		Authority authority = authorityRepository.findAuthorityByName(name);
		if(null!=authority){
			return true;
		}
		return false;
	}
	
}
