package com.simple.yuc.service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.Request;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.simple.yuc.config.RootConfig;
import com.simple.yuc.entity.User;
import com.simple.yuc.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=RootConfig.class)
@TransactionConfiguration(transactionManager="transactionManager")
public class UserServiceTest {
	private static final Logger logger = LoggerFactory.getLogger(UserServiceTest.class);
	
	@Autowired
	private UserService userService;
	
	@Test
	@Rollback(false)
	public void register(){	
//		User user = new User();
//		user.setAddress("");
//		user.setAppYear("2");
//		user.setBirth(new Long(0));
//		user.setEmail("");
//		user.setEnable(new Long(0));
//		user.setHead(null);
//		user.setIdentity("");
//		user.setIp("");
//		user.setName("");
//		user.setPassword("");
//		user.setQuotation("");
//		user.setSex(new Long(0));
//		user.setTime(new Long(0));
//		user.setUserName(null);
//		user.setPhone("");
//		
//		System.out.println("-------------------"+user.getUserName());
//		boolean success = userService.register(user);
//		
//		logger.info("Success to register an user:"+success);
	}
	
	public void login(){
		User user1 = userService.login("root1", "root","192.168.1.1");
		MockHttpSession session1 = new MockHttpSession();
		session1.putValue("user", user1);
		
		User user2 = userService.login("root1", "root","192.168.1.1");
		MockHttpSession session2 = new MockHttpSession();
		session2.putValue("user", user2);
		
		logger.info("Success to login user1:"+user1.getName());
		logger.info("Success to login user2:"+user1.getName());
	}
	
	public void findAllByPage(){
		List<User> users = userService.findAllByPage(2, 3,null);
		for(User user:users){
			System.out.println(user.getName());
		}
	}
	
}


