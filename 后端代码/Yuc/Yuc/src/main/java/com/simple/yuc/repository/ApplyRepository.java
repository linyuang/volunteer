package com.simple.yuc.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.simple.yuc.entity.Apply;
import com.simple.yuc.repository.custom.ApplyRepositoryCustom;

public interface ApplyRepository extends JpaRepository<Apply, Long>,
	ApplyRepositoryCustom,JpaSpecificationExecutor<Apply>{

	Apply findApplyByUserIdAndActId(Long userId,Long actId);
	
	List<Apply> findApplyByUserIdAndEnable(Long userId,String enable);
	
	List<Apply> findAllByActId(Long actId);
	
	List<Apply> findApplyByActIdAndEnable(Long actId,String enable);
	
	Page<Apply> findByActIdAndEnable(Long actId,String enable,Pageable pageable);
}
