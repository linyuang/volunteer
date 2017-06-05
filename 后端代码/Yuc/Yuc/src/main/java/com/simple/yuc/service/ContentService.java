package com.simple.yuc.service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.simple.yuc.config.Constans;
import com.simple.yuc.entity.Content;
import com.simple.yuc.repository.ContentRepository;

@Component
public class ContentService {
	
	private static final Logger logger = LoggerFactory.getLogger(ContentService.class);
	
	@Autowired
	private ContentRepository contentRepository;
	
	
	//保存临时文件信息到表
	public Content save(MultipartFile file) throws IOException{
		String fileName = file.getOriginalFilename();
		String type = fileName.substring(fileName.lastIndexOf("."), fileName.length());
		//生成UUID主键
		String newFileName = UUID.randomUUID().toString().replace("-", "") + type;
		String path = Constans.TEMPPATH + newFileName;
		file.transferTo(new File(Constans.PREFIX +path));
		//存相对路径
		Content content = new Content(null, path, newFileName, 
				file.getContentType(), String.valueOf(file.getSize()));
		content = contentRepository.saveAndFlush(content);
		return content;
	}
	
	
	//是否存在该文件
	public boolean isExist(String title){
		Content content = contentRepository.findContentByTitle(title);
		if(null!=content){
			return true;
		}
		return false;
	}
	
	
	public Content getContent(String title){
		Content content = contentRepository.findContentByTitle(title);
		return content;
	}
	
}
