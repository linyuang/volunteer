package com.simple.yuc.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.simple.yuc.entity.AdminAuthority;
import com.simple.yuc.entity.Authority;
import com.simple.yuc.repository.AdminAuthorityRepository;

@Component
public class AdminAuthorityService {
	
	private static final Logger logger = LoggerFactory.getLogger(AdminAuthorityService.class);
	
	@Autowired
	private AdminAuthorityRepository adminAuthorityRepository;
	
	//增加管理员某一项权限
	public boolean save(AdminAuthority adminAuthority){
		if(!isExist(adminAuthority.getAdminId(),
				adminAuthority.getAuthorityId())){
			adminAuthorityRepository.saveAndFlush(adminAuthority);
			return true;
		}
		return false;
	}
	
	//删除管理员时删除关联
	public void deleteByAdmin(Long adminId){
		List<AdminAuthority> adminAuthorities = 
				adminAuthorityRepository.findAllByAdminId(adminId);
		adminAuthorityRepository.delete(adminAuthorities);
	}
	
	
	//删除权限时删除关联
	public void deleteAllByAuthorityId(Long authorityId){
		List<AdminAuthority> adminAuthorities = 
				adminAuthorityRepository.findAllByAuthorityId(authorityId);
		adminAuthorityRepository.delete(adminAuthorities);
	}
	
	//删除管理员某一项权限
	public void delete(AdminAuthority adminAuthority){
		AdminAuthority target = adminAuthorityRepository.findAdminAuthorityByAdminIdAndAuthorityId(
				adminAuthority.getAdminId(), adminAuthority.getAuthorityId());
		if(null!=target){
			adminAuthorityRepository.delete(target);
		}
	}
	
	
	//返回管理员所有权限
	public List<Authority> findAuthorityForAdmin(){
		return null;
	}
	
	//判断是否存在本条记录
	public boolean isExist(Long adminId,Long authorityId){	
		AdminAuthority adminAuthority =  
				adminAuthorityRepository.findAdminAuthorityByAdminIdAndAuthorityId(
						adminId, authorityId);
		if(null!=adminAuthority){
			return true;
		}
		return false;
	}
	
}
