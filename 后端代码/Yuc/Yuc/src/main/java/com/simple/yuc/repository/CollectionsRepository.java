package com.simple.yuc.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.simple.yuc.entity.Collections;
import com.simple.yuc.entity.Community;
import com.simple.yuc.repository.custom.CollectionsRepositoryCustom;

public interface CollectionsRepository extends JpaRepository<Collections, Long>,
		CollectionsRepositoryCustom,PagingAndSortingRepository<Collections, Long>,JpaSpecificationExecutor<Collections>{

	Collections findCollectionsByUserIdAndCommunityId(Long userId,Long CommunityId);
	
//	@Query("SELETE a FROM Community AS a,Collections AS b WHERE a.id=b.communityId AND b.userId=?")
//	List<Community> findCommunityByUserId(Long userId);
	
//	@Query("SELETE a FROM Community a,Collections b WHERE a.id=b.communityId AND b.userId=?")
//	List<Community> findCommunityByUserId(Long userId,Pageable pageable);
}