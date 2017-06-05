package com.simple.yuc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="activity")
public class Activity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="address")
	private String address;
	
	@Column(name="time")
	private String time;
	
	@Column(name="quotation")
	private String quotation;
	
	@Column(name="comId")
	private Long comId;

	@Column(name="enable")
	private String enable;
	
	@Column(name="image")
	private String image;
	
	@Column(name="url")
	private String url;
	
	@Column(name="priority")
	private String priority;

	public Activity(Long id, String name, String address, String time,
			String quotation, Long comId, String enable, String image,
			String url, String priority) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.time = time;
		this.quotation = quotation;
		this.comId = comId;
		this.enable = enable;
		this.image = image;
		this.url = url;
		this.priority = priority;
	}



	public Activity() {
		super();
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
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



	public String getQuotation() {
		return quotation;
	}



	public void setQuotation(String quotation) {
		this.quotation = quotation;
	}



	public Long getComId() {
		return comId;
	}



	public void setComId(Long comId) {
		this.comId = comId;
	}



	public String getEnable() {
		return enable;
	}



	public void setEnable(String enable) {
		this.enable = enable;
	}



	public String getImage() {
		return image;
	}



	public void setImage(String image) {
		this.image = image;
	}



	public String getUrl() {
		return url;
	}



	public void setUrl(String url) {
		this.url = url;
	}



	public String getPriority() {
		return priority;
	}



	public void setPriority(String priority) {
		this.priority = priority;
	}



	
	
}
