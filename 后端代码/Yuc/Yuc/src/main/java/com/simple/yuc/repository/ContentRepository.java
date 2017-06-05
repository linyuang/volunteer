package com.simple.yuc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.yuc.entity.Content;
import com.simple.yuc.repository.custom.ContentRepositoryCustom;

public interface ContentRepository extends JpaRepository<Content, Long>,ContentRepositoryCustom{
	Content findContentByTitle(String title);
}
