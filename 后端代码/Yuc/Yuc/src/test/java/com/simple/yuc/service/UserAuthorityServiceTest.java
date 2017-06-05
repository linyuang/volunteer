package com.simple.yuc.service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.Request;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.simple.yuc.config.RootConfig;
import com.simple.yuc.entity.User;
import com.simple.yuc.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=RootConfig.class)
@TransactionConfiguration(transactionManager="transactionManager")
public class UserAuthorityServiceTest {
	private static final Logger logger = LoggerFactory.getLogger(UserAuthorityServiceTest.class);
	
	@Autowired
	private UserAuthorityService userAuthorityService;
	
	@Test
	public void deleteByAuthorityId(){
		userAuthorityService.deleteAllByAuthorityId(3L);
	}
	
}


