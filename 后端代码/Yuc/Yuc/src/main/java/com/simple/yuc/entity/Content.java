package com.simple.yuc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="content")
public class Content {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@Column(name="url")
	private String url;
	
	@Column(name="title")
	private String title;
	
	@Column(name="type")
	private String type;

	@Column(name="size")
	private String size;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Content(Long id, String url, String title, String type, String size) {
		super();
		this.id = id;
		this.url = url;
		this.title = title;
		this.type = type;
		this.size = size;
	}

	public Content() {
		super();
	}
	
	
}
