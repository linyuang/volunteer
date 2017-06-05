package com.simple.yuc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name="user")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@Column(name="userName")//帐号
	private String userName;
	
	@Column(name="password")//密码
	private String password;
	
	@Column(name="ip")//上一次登录ip
	private String ip;
	
	@Column(name="head")//头像地址
	private String head;
	
	@Column(name="quotation")//用户介绍
	private String quotation;
	
	@Column(name="name")//真实名字
	private String name;
	
	@Column(name="sex")//性别
	private String sex;
	
	@Column(name="birth")//生日 格式19950101
	private String birth;
	
	@Column(name="identity")//身份
	private String identity;
	
	@Column(name="address")//地址
	private String address;
	
	@Column(name="appYear")//注册时间
	private String appYear;
	
	@Column(name="time")//志愿年限
	private String time;
	
	@Column(name="phone")//电话
	private String phone;
	
	@Column(name="email")//邮件
	private String email;
	
	@Column(name="enable")//是否冻结
	private String enable;
	
	public String getAppYear() {
		return appYear;
	}

	public void setAppYear(String appYear) {
		this.appYear = appYear;
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

	public String getQuotation() {
		return quotation;
	}

	public void setQuotation(String quotation) {
		this.quotation = quotation;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getBirth() {
		return birth;
	}

	public void setBirth(String birth) {
		this.birth = birth;
	}

	public String getIdentity() {
		return identity;
	}

	public void setIdentity(String identity) {
		this.identity = identity;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public User(Long id, String userName, String password, String ip,
			String head, String quotation, String name, String sex,
			String birth, String identity, String address, String appYear,
			String time, String phone, String email, String enable) {
		super();
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.ip = ip;
		this.head = head;
		this.quotation = quotation;
		this.name = name;
		this.sex = sex;
		this.birth = birth;
		this.identity = identity;
		this.address = address;
		this.appYear = appYear;
		this.time = time;
		this.phone = phone;
		this.email = email;
		this.enable = enable;
	}

	public User() {
		super();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id.intValue();
		result = prime * result + ((userName == null) ? 0 : userName.hashCode());
		return result;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)return true;
		if (obj == null)return false;
		if (!(obj instanceof User))return false;
		
		User other = (User) obj;
		if (id != other.getId())return false;
		
		if (userName == null) {
			if (other.userName != null)return false;
		} else if (!userName.equals(other.getUserName())){
			return false;
		}	
		return true;
	}
}
