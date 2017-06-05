package com.simple.yuc.service;

import java.util.LinkedList;
import java.util.List;

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
import com.simple.yuc.entity.User;
import com.simple.yuc.entity.UserAuthority;
import com.simple.yuc.repository.UserRepository;

@Component
public class UserService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserAuthorityService userAuthorityService;
	@Autowired
	private AuthorityService authorityService;
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	
	//用户注册
	//不允许用户名跟组织名、管理员重复
	@Transactional
	public User register(User newUser){
		User user = userRepository.saveAndFlush(newUser);
		//同时增加默认权限
		Long authorityId = authorityService.findIdByName("ROLE_USER");
		UserAuthority userAuthority = new UserAuthority();
		userAuthority.setUserId(user.getId());
		userAuthority.setAuthorityId(authorityId);
		
		userAuthorityService.save(userAuthority);
		
		return user;
	}
	
	//用户登录
	public User login(String userName,String password,String ip){
		User user = userRepository.findUserByuserNameAndPassword(userName, password);
		if(null!=user){
			//保存当前登录的ip地址
			user.setIp(ip);
			user = userRepository.save(user);
			return user;
		}
		return null;
	}
	
	
	//分页查找用户
	public List<User> findAllByPage(int page,int size,Sort sort){
		Pageable pageable = new PageRequest(page, size,sort);
		Page<User> pages = userRepository.findAll(pageable);
		return pages.getContent();
	}
	
	//直接返回所有用户
	public List<User> findAll(){
		return userRepository.findAll();
	}
	
	//用户修改基本资料(身份\志愿年限\电话\邮箱\用户语录\昵称\地址\)
	public User update(User newUser){
		User user = userRepository.findUserByUserName(newUser.getUserName());
		user.setAddress(newUser.getAddress());
		//user.setEmail(newUser.getEmail());
		user.setHead(newUser.getHead());
		user.setSex(newUser.getSex());
		user.setBirth(newUser.getBirth());
		user.setIdentity(newUser.getIdentity());
		user.setName(newUser.getName());
		user.setPhone(newUser.getPhone());
		user.setTime(newUser.getTime());
		user.setQuotation(newUser.getQuotation());
		user = userRepository.saveAndFlush(user);
		return user;
	}
	
	//用户修改密码
	public void update(String userName,String password){
		User user = userRepository.findUserByUserName(userName);
		user.setPassword(password);
		userRepository.saveAndFlush(user);
	}
	
	//用户修改头像
	public void update(MultipartFile file){
		
	}

	//冻结或解冻用户
	public boolean enable(String userName,String enable){
		User user = userRepository.findUserByUserName(userName);
		if(user!=null){
			user.setEnable(enable);
			user = userRepository.saveAndFlush(user);
			return true;
		}
		return false;
	}
	
	//验证用户
	public boolean vaildUser(String userName,String password){
		User user = userRepository.findUserByuserNameAndPassword(userName, password);
		if(null!=user){
			return true;
		}
		return false;
	}
	
	//是否存在该用户
	public boolean isExist(String userName){
		User user = userRepository.findUserByUserName(userName);
		if(null!=user){
			return true;
		}
		return false;
	}
	
	//验证邮箱是否存在
	public boolean vaildEmail(String email){
		User user = userRepository.findUserByEmail(email);
		if(null!=user){
			return true;
		}
		return false;
	}
	
	//发送通知重复登录
	public void handleLoginContradict(String userName){
		simpMessagingTemplate.convertAndSendToUser(
				userName, "/queue/notifications", "重复登录");
	}
	
	
	//根据id返回用户
	public List<User> getUsersByIds(List<Long> ids){
		List<User> users = userRepository.findAll(ids);
		return users;
	}
	
}
