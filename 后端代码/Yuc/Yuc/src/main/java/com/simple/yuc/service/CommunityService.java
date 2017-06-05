package com.simple.yuc.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.simple.yuc.config.Constans;
import com.simple.yuc.entity.Community;
import com.simple.yuc.entity.CommunityAuthority;
import com.simple.yuc.entity.User;
import com.simple.yuc.repository.CommunityRepository;

@Component
public class CommunityService {
	
	private static final Logger logger = LoggerFactory.getLogger(CommunityService.class);
	
	@Autowired
	private CommunityRepository communityRepository;
	@Autowired
	private AuthorityService authorityService;
	@Autowired
	private CommunityAuthorityService communityAuthorityService;
	
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	
	//组织登录
	public Community login(String userName,String password,String ip){
		Community community = communityRepository.findCommunityByUserNameAndPassword(userName, password);
		if(null!=community){
			//保存当前登录的ip地址
			community.setIp(ip);
			community = communityRepository.save(community);
			return community;
		}
		return null;
	}
	
	public List<Community> findAllByPage(int page,int size,Sort sort){
		Pageable pageable = new PageRequest(page, size,sort);
		Page<Community> pages = communityRepository.findAll(pageable);
		return pages.getContent();
	}
	
	
	//组织注册
	//不允许用户名跟组织名重复
	@Transactional
	public Community register(Community newCommunity){
		Community community = communityRepository.saveAndFlush(newCommunity);
		//同时增加默认权限
		Long authorityId = authorityService.findIdByName("ROLE_COMMUNITY");
		CommunityAuthority communityAuthority = new CommunityAuthority();
		communityAuthority.setAuthorityId(authorityId);
		communityAuthority.setCommunityId(community.getId());

		communityAuthorityService.save(communityAuthority);
		return community;
		
	}
	
	//组织修改资料(地址、组织语录、创建时间、头像名)
	//前提条件是前台传过来的头像路径是数据库存在的,这个会在用户上传图片的时候传到前台
	public Community update(Community newCommunity){
		Community community = communityRepository.findCommunityByUserName(newCommunity.getUserName());
		
		if(!newCommunity.getHead().equals(
				community.getHead())){
			//移动文件到正式目录
			File file = new File(Constans.PREFIX + Constans.TEMPPATH + newCommunity.getHead());
			File target = new File(Constans.PREFIX + Constans.COMMUNITYHEADPATH + newCommunity.getHead());
			file.renameTo(target);			
			community.setHead(Constans.COMMUNITYHEADPATH + newCommunity.getHead());
		}
		community.setName(newCommunity.getName());
		community.setAddress(newCommunity.getAddress());
		community.setQuotation(newCommunity.getQuotation());
		community.setSetUp(newCommunity.getSetUp());
		communityRepository.saveAndFlush(community);
		return community;
	}
	
	//组织改名
	public Community update(String userName,String newName){
		Community community = communityRepository.findCommunityByUserName(userName);
		community.setName(newName);
		community = communityRepository.saveAndFlush(community);
		return community;
	}
	
	//改头像
//	public Community updateHead(String head,String userName){
//		Community community = communityRepository.findCommunityByUserName(userName);
//		community.setHead(head);
//		community = communityRepository.saveAndFlush(community);
//		return community;
//	}
	
	//组织修改密码
	public Community updatePassword(String userName,String password){
		Community community = communityRepository.findCommunityByUserName(userName);
		community.setPassword(password);
		community = communityRepository.saveAndFlush(community);
		return community;
	}
	
	//验证组织
	public boolean vaildCommunity(String userName,String password){
		Community community = communityRepository.findCommunityByUserNameAndPassword(userName, password);
		if(null!=community){
			return true;
		}
		return false;
	
	}
	
	//冻结或解冻组织
	public Boolean enable(String userName,String enable){
		Community community = communityRepository.findCommunityByUserName(userName);
		if(null!=community){
			community.setEnable(enable);
			communityRepository.saveAndFlush(community);
			return true;
		}
		return false;
	}
	
	//组织换头像
	public String update(MultipartFile file) throws IOException{
		String fileContentType = file.getContentType();
		//生成UUID主键
		String newFileName = UUID.randomUUID().toString().replace("-", "");
		String path = Constans.PREFIX + Constans.COMMUNITYHEADPATH 
				+ newFileName + fileContentType;
		file.transferTo(new File(path));
		return path;
	}
	
	
	//是否已经存在该组织
	public boolean isExist(String userName){
		Community community = communityRepository.findCommunityByUserName(userName);
		if(null!=community){
			return true;
		}
		return false;
	}
	
	public void handleLoginContradict(String userName){
		simpMessagingTemplate.convertAndSendToUser(
				userName, "/queue/notifications", "重复登录");
	}
	
	
	public Community getCommunity(Long id){
		return communityRepository.findOne(id);
	}
	
}
