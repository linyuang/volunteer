package com.simple.yuc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="friends")
public class Friends {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@Column(name="f_userId")
	private Long f_userId;
	
	@Column(name="s_userId")
	private Long s_userId;
	
	@Column(name="ans")
	private String ans;

	
	public String getAns() {
		return ans;
	}

	public void setAns(String ans) {
		this.ans = ans;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getF_userId() {
		return f_userId;
	}

	public void setF_userId(Long f_userId) {
		this.f_userId = f_userId;
	}

	public Long getS_userId() {
		return s_userId;
	}

	public void setS_userId(Long s_userId) {
		this.s_userId = s_userId;
	}

	public Friends(Long id, Long f_userId, Long s_userId,String ans) {
		super();
		this.id = id;
		this.f_userId = f_userId;
		this.s_userId = s_userId;
		this.ans = ans;
	}

	public Friends() {
		super();
	}
	
	
	
	
}
