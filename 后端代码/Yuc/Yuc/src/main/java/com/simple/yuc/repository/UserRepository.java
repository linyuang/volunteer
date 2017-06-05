package com.simple.yuc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.simple.yuc.entity.User;
import com.simple.yuc.repository.custom.UserRepositoryCustom;

public interface UserRepository extends JpaRepository<User, Long>,
				UserRepositoryCustom,PagingAndSortingRepository<User, Long>,JpaSpecificationExecutor<User>{
	
	User findUserByUserName(String userName);
	
	User findUserByuserNameAndPassword(String userName,String password);
	
	User findUserByEmail(String email);
	
	User findUserById(String id);
	
}
