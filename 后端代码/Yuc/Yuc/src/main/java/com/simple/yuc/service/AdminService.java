package com.simple.yuc.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.simple.yuc.entity.Admin;
import com.simple.yuc.entity.AdminAuthority;
import com.simple.yuc.repository.AdminRepository;

@Component
public class AdminService {
	
	private static final Logger logger = LoggerFactory.getLogger(AdminService.class);
	
	private static final String ADMIN_ENABLE = "1";
	private static final String ADMIN_UNENABLE = "0"; 
	
	@Autowired
	private AdminRepository adminRepository;
	
	
	@Autowired
	private AuthorityService authorityService;
	@Autowired
	private AdminAuthorityService adminAuthorityService;
	
	//返回所有的管理员列表(分页)
	public List<Admin> findAllByPage(int page,int size,Sort sort){
		Pageable pageable = new PageRequest(page, size,sort);
		Page<Admin> pages = adminRepository.findAll(pageable);
		return pages.getContent();
	}
	
	//增加管理员
	@Transactional
	public Admin addAdmin(Admin newAdmin){
		Admin admin = adminRepository.saveAndFlush(newAdmin);
		//同时增加默认权限
		Long authorityId = authorityService.findIdByName("ROLE_ADMIN");
		AdminAuthority adminAuthority = new AdminAuthority();
		adminAuthority.setAdminId(admin.getId());
		adminAuthority.setAuthorityId(authorityId);
			
		adminAuthorityService.save(adminAuthority);
		
		return admin;
	}
	
	//删除管理员
	public void deleteAdmin(String userName){
		Admin admin = adminRepository.findAdminByUserName(userName);
		adminRepository.delete(admin);
		//同时删除权限关联表的记录
	}
	
	//修改管理员密码
	public void update(String userName,String password){
		Admin admin = adminRepository.findAdminByUserName(userName);
		admin.setPassword(password);
		adminRepository.saveAndFlush(admin);
	}
	
	
	//是否存在admin
	public boolean isExist(String userName){
		Admin admin = adminRepository.findAdminByUserName(userName);
		if(null!=admin){
			return true;
		}
		return false;
	}
	
	//管理员登录
	public Admin login(String userName,String password){
		Admin admin = adminRepository.findAdminByUserNameAndPassword(userName, password);
		return admin;
	}
	
	
	//判断是否冻结
	public boolean isENable(String userName){
		Admin admin = adminRepository.findAdminByUserName(userName);
		if(admin.getEnable().equals(ADMIN_ENABLE)){
			return true;
		}
		return false;
	}
}
