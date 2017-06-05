package com.simple.yuc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.simple.yuc.entity.Authority;
import com.simple.yuc.entity.CommunityAuthority;
import com.simple.yuc.repository.custom.CommunityAuthorityRepositoryCustom;

public interface CommunityAuthorityRepository extends JpaRepository<CommunityAuthority, Long>,CommunityAuthorityRepositoryCustom{
	
	@Query("SELECT a FROM Authority AS a,Community AS b,CommunityAuthority AS c WHERE a.id=c.authorityId AND b.id=c.communityId AND b.id=?")
	List<Authority> findAllAuthorityByCommunityId(Long communityId);
	
	CommunityAuthority findCommunityAuthorityByCommunityIdAndAuthorityId(Long communityId,Long authorityId);

	List<CommunityAuthority> findAllByAuthorityId(Long authorityId);
}
