package com.simple.yuc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.simple.yuc.entity.Admin;
import com.simple.yuc.repository.custom.AdminRepositoryCustom;

public interface AdminRepository extends JpaRepository<Admin, Long>,
		AdminRepositoryCustom,PagingAndSortingRepository<Admin, Long>,JpaSpecificationExecutor<Admin>{
	public Admin findAdminByUserName(String userName);
	
	public Admin findAdminByUserNameAndPassword(String userName,String password);
	
	
}