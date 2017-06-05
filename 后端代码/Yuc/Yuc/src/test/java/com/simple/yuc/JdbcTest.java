package com.simple.yuc;

import static org.junit.Assert.assertEquals;

import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.simple.yuc.config.RootConfig;
import com.simple.yuc.entity.User;
import com.simple.yuc.repository.UserRepository;

/**
 * 测试数据库
 * @author Administrator
 *
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=RootConfig.class)
@TransactionConfiguration(transactionManager="transactionManager")
public class JdbcTest {
	
	private static final Logger logger = LoggerFactory.getLogger(JdbcTest.class);
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Test
	public void testDB(){
		String sql = "select * from user limit 1";
		Map<String,Object> map = jdbcTemplate.queryForMap(sql);
		
		logger.info("testDB:"+map.get("userName").toString());
	}
	
}
