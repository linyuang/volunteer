package com.simple.yuc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.yuc.entity.Authority;
import com.simple.yuc.repository.custom.AuthorityRepositoryCustom;

public interface AuthorityRepository extends JpaRepository<Authority, Long>,AuthorityRepositoryCustom{
	public Authority findAuthorityByName(String name);
}
