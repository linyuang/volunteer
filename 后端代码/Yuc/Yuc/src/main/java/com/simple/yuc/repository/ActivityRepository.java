package com.simple.yuc.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.simple.yuc.entity.Activity;
import com.simple.yuc.repository.custom.ActivityRepositoryCustom;

public interface ActivityRepository extends JpaRepository<Activity, Long>,
	ActivityRepositoryCustom,PagingAndSortingRepository<Activity, Long>,JpaSpecificationExecutor<Activity>{
	
	Activity findActivityByNameAndComId(String name,Long comId);
	
	Activity findActivityById(Long id);
	
	Page<Activity> findByComId(Long comId,Pageable pageable);
	
}
