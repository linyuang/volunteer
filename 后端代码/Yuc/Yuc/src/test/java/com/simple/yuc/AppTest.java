package com.simple.yuc;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.simple.yuc.config.RootConfig;
import com.simple.yuc.entity.Activity;
import com.simple.yuc.repository.ActivityRepository;

/**
 * 测试控制器方面
 * @author Administrator
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=RootConfig.class)
public class AppTest {
	
	private static final Logger logger = LoggerFactory.getLogger(AppTest.class);
	
	
	
	  public void testHomePage() throws Exception {
		logger.error("test...");
//	    HomeController controller = new HomeController();
//	    MockMvc mockMvc = standaloneSetup(controller).build();
//	    mockMvc.perform(get("/"))
//	           .andExpect(view().name("home"));
	  }

	
}
