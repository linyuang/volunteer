package com.simple.yuc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.yuc.entity.Community;
import com.simple.yuc.repository.custom.CommunityRepositoryCustom;

public interface CommunityRepository extends JpaRepository<Community, Long>,CommunityRepositoryCustom{
	
	Community findCommunityByUserName(String userName);
	
	Community findCommunityByUserNameAndPassword(String userName,String password);
	
}
