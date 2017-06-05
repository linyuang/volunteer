package com.simple.yuc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="collections")
public class Collections {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	
	@Column(name="userId")
	private Long userId;
	
	
	@Column(name="communityId")
	private Long communityId;

	
	public Collections() {
		super();
	}


	public Collections(Long id, Long userId, Long communityId) {
		super();
		this.id = id;
		this.userId = userId;
		this.communityId = communityId;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Long getUserId() {
		return userId;
	}


	public void setUserId(Long userId) {
		this.userId = userId;
	}


	public Long getCommunityId() {
		return communityId;
	}


	public void setCommunityId(Long communityId) {
		this.communityId = communityId;
	}
	
	
}
