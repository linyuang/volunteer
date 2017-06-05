package com.simple.yuc.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.simple.yuc.entity.Authority;
import com.simple.yuc.entity.UserAuthority;
import com.simple.yuc.repository.UserAuthorityRepository;

@Component
public class UserAuthorityService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserAuthorityService.class);
	
	@Autowired
	private UserAuthorityRepository userAuthorityRepository;
	
	//增加用户某一项权限
	public boolean save(UserAuthority userAuthority){
		if(!isExist(userAuthority.getUserId(), 
				userAuthority.getAuthorityId())){
			userAuthorityRepository.saveAndFlush(userAuthority);
			return true;
		}
		return false;
	}
	
	//删除用户某一项权限
	public void delete(UserAuthority userAuthority){
		UserAuthority target = userAuthorityRepository.findUserAuthorityByUserIdAndAuthorityId(
				userAuthority.getUserId(), userAuthority.getUserId());
		if(null!=target){
			userAuthorityRepository.delete(target);
		}
	}
	
	//删除权限时删除关联
	public void deleteAllByAuthorityId(Long authorityId){
		List<UserAuthority> userAuthrities = userAuthorityRepository.findAllByAuthorityId(authorityId);
		userAuthorityRepository.delete(userAuthrities);
	}
	
	//返回用户所有权限
	public List<Authority> findAllAuthorityByUserId(Long userId){
		return userAuthorityRepository.findAllAuthorityByUserId(userId);
	}
	
	//是否存在本条记录
	public boolean isExist(Long userId,Long authorityId){
		UserAuthority userAuthority = userAuthorityRepository.findUserAuthorityByUserIdAndAuthorityId(userId, authorityId);
			if(null!=userAuthority){
				return true;
			}
			return false;
	}
}
