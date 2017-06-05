package com.simple.yuc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="community")
public class Community {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@Column(name="userName")//组织账号
	private String userName;
	
	@Column(name="password")//密码
	private String password;
	
	@Column(name="name")//组织名
	private String name;
	
	@Column(name="ip")//ip
	private String ip;
	
	@Column(name="head")//头像路径
	private String head;
	
	@Column(name="address")//组织地址
	private String address;
	
	@Column(name="quotation")//组织介绍
	private String quotation;
	
	@Column(name="setUp")//成立时间
	private String setUp;
	
	@Column(name="enable")//冻结
	private String enable;
	
	@Column(name="type")//类型
	private String type;
	
	
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getEnable() {
		return enable;
	}

	public void setEnable(String enable) {
		this.enable = enable;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getHead() {
		return head;
	}

	public void setHead(String head) {
		this.head = head;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getQuotation() {
		return quotation;
	}

	public void setQuotation(String quotation) {
		this.quotation = quotation;
	}

	public String getSetUp() {
		return setUp;
	}

	public void setSetUp(String setUp) {
		this.setUp = setUp;
	}

	public Community(Long id, String userName, String password, String name,
			String ip, String head, String address, String quotation,
			String setUp, String enable,String type) {
		super();
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.name = name;
		this.ip = ip;
		this.head = head;
		this.address = address;
		this.quotation = quotation;
		this.setUp = setUp;
		this.enable = enable;
		this.type = type;
	}

	public Community() {
		super();
	}

	
	
}
