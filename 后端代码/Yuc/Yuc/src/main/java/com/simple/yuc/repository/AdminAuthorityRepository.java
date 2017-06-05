package com.simple.yuc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.simple.yuc.entity.AdminAuthority;
import com.simple.yuc.entity.Authority;
import com.simple.yuc.repository.custom.AdminAuthorityRepositoryCustom;

public interface AdminAuthorityRepository extends JpaRepository<AdminAuthority, Long>,AdminAuthorityRepositoryCustom{
	
	@Query("SELECT a FROM Authority AS a,Admin AS b,AdminAuthority AS c WHERE a.id=c.authorityId AND b.id=c.adminId AND b.id=?")
	List<Authority> findAllAuthorityByAdminId(Long adminId);
	
	AdminAuthority findAdminAuthorityByAdminIdAndAuthorityId(Long adminId,Long authorityId);
	
	List<AdminAuthority> findAllByAuthorityId(Long authorityId);
	
	List<AdminAuthority> findAllByAdminId(Long adminId);
}
