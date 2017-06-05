package com.simple.yuc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.yuc.entity.Friends;
import com.simple.yuc.repository.custom.FriendsRepositoryCustom;

public interface FriendsRepository extends JpaRepository<Friends, Long>,FriendsRepositoryCustom{
	
}
