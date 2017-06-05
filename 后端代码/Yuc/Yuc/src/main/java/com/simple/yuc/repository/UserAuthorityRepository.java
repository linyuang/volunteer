package com.simple.yuc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.simple.yuc.entity.Authority;
import com.simple.yuc.entity.UserAuthority;
import com.simple.yuc.repository.custom.UserAuthorityRepositoryCustom;

public interface UserAuthorityRepository extends JpaRepository<UserAuthority, Long>,UserAuthorityRepositoryCustom{
	
	@Query("SELECT a FROM Authority AS a,User AS b,UserAuthority AS c WHERE a.id=c.authorityId AND b.id=c.userId AND b.id=?")
	List<Authority> findAllAuthorityByUserId(Long userId);
	
	UserAuthority findUserAuthorityByUserIdAndAuthorityId(Long userId,Long authorityId);
	
	List<UserAuthority> findAllByAuthorityId(Long authorityId);
	
}
