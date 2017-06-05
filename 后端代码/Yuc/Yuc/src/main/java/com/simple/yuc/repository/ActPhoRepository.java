package com.simple.yuc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.yuc.entity.ActPho;
import com.simple.yuc.repository.custom.ActPhoRepositoryCustom;

public interface ActPhoRepository extends JpaRepository<ActPho, Long>,ActPhoRepositoryCustom{
	
}
