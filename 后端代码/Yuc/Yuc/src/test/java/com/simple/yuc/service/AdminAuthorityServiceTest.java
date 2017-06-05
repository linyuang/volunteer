package com.simple.yuc.service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.simple.yuc.config.RootConfig;
import com.simple.yuc.entity.Activity;
import com.simple.yuc.entity.User;
import com.simple.yuc.repository.ActivityRepository;
import com.simple.yuc.repository.ApplyRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=RootConfig.class)
@TransactionConfiguration(transactionManager="transactionManager")
public class AdminAuthorityServiceTest {
	private static final Logger logger = LoggerFactory.getLogger(AdminAuthorityServiceTest.class);
	
	@Autowired
	private AdminAuthorityService adminAuthorityService;
	
	@Autowired
	private ActivityRepository activityRepository;
	
	@Autowired
	private ApplyRepository applyRepository;
	
	@Autowired
	private ApplyService applyService;
	
	@Test
	public void deleteByAdmin(){
		//adminAuthorityService.deleteByAdmin(new Long(1));
	}
	
	@Test
	public void test(){
//		applyRepository.deleteByActId(new int[]{1,2}, new String[]{"0","1"});
//		activityRepository.setEnableForComId("1", 1L, "0");
//		List<User> list = applyService.findUserByActIdAndEnable(1L, "1", 0, 3, new Sort(Direction.DESC,"id"));
//		System.out.println(list.size());
//		applyRepository.removeByEnable("1");
//		applyRepository.deleteByActId(1L);
		
//		Activity activity = activityRepository.findActivityById(1L);
//		System.out.println(activity.getName());
//		List<Activity> list = activityRepository.findActivityOrderByTime(4,"1");
//		
//		for(Activity a:list){
//			System.out.println(a.getName());
//		}
	}
}


