package com.simple.yuc.service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.simple.yuc.config.RootConfig;
import com.simple.yuc.entity.User;
import com.simple.yuc.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=RootConfig.class)
@TransactionConfiguration(transactionManager="transactionManager")
public class CommunityServiceTest {
	private static final Logger logger = LoggerFactory.getLogger(CommunityServiceTest.class);
	
	@Autowired
	private UserService userService;
	
	
	public void register(){	
//		User user = new User();
//		user.setAddress("2");
//		user.setAppYear("2");
//		user.setBirth(new Long(0));
//		user.setEmail("");
//		user.setEnable(new Long(0));
//		user.setHead("");
//		user.setIdentity("");
//		user.setIp("");
//		user.setName("");
//		user.setPassword("");
//		user.setQuotation("");
//		user.setSex(new Long(0));
//		user.setTime(new Long(0));
//		user.setUserName("");
//		user.setPhone("");
		
		//boolean success = userService.register(user);
		
		//logger.info("Success to register an user:"+success);
	}
	
	public void login(){
		User user = userService.login("root1", "root","192.168.1.1");
		logger.info("Success to login an user:"+user.getName());
	}
	
	public void findAllByPage(){
		List<User> users = userService.findAllByPage(2, 3,null);
		for(User user:users){
			System.out.println(user.getName());
		}
	}
	
}


