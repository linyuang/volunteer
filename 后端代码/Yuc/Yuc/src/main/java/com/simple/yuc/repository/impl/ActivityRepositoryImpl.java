package com.simple.yuc.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

import com.simple.yuc.entity.Activity;
import com.simple.yuc.repository.custom.ActivityRepositoryCustom;

public class ActivityRepositoryImpl implements ActivityRepositoryCustom {

	@Autowired
	LocalContainerEntityManagerFactoryBean localContainerEntityManagerFactoryBean;
	
	@Autowired
	JdbcOperations jdbcOperations;
	
	@Override
	public List<Activity> findActivityOrderByTime(int size,String enable) {
		// TODO Auto-generated method stub
		EntityManagerFactory emf = localContainerEntityManagerFactoryBean.getNativeEntityManagerFactory();
		EntityManager em = emf.createEntityManager();
		Query query = em.createQuery(
				"SELECT a FROM Activity As a WHERE a.enable=:enable ORDER BY a.time");
		query.setParameter("enable", enable);
		query.setMaxResults(size);
		
		List<Activity> list = query.getResultList();
		return list;
	}
	
	public int[] setEnableForComId(String enable,String userName,String oldEnable){
		
		String sql = "UPDATE activity AS a SET a.`enable` = "+enable+" WHERE a.`enable` = "+oldEnable+" AND a.comId = (" +
				"SELECT c.id FROM community AS c WHERE c.userName = '"+userName+"')";
		System.out.println(sql);
		return jdbcOperations.batchUpdate(sql);
	}

}
