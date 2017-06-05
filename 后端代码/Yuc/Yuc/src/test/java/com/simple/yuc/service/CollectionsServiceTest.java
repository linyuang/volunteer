package com.simple.yuc.service;

import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.simple.yuc.config.RootConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=RootConfig.class)
@TransactionConfiguration(transactionManager="transactionManager")
public class CollectionsServiceTest {
	private static final Logger logger = LoggerFactory.getLogger(CollectionsServiceTest.class);
	
	
	
}


