package com.simple.yuc.repository.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;

import com.simple.yuc.repository.custom.ApplyRepositoryCustom;

public class ApplyRepositoryImpl implements ApplyRepositoryCustom {
	@Autowired
	JdbcOperations jdbcOperations;

	@Override
	public void deleteByActId(int[] ids, String[] enables) {
		// TODO Auto-generated method stub
		String sql = "DELETE FROM apply WHERE actId in(";
		for(int i=0;i<ids.length-1;i++){
			sql+=ids[i]+",";
		}
		sql+=ids[ids.length-1]+") AND enable in(";
		for(int i = 0;i<enables.length-1;i++){
			sql+=enables[i]+",";
		}
		sql+=enables[enables.length-1]+")";
		jdbcOperations.execute(sql);
	}
	
	@Override
	public void deleteByUserNameAndEnable(String userName,String enable){
		String sql = "DELETE FROM apply WHERE enable="+enable+
				" AND userId = (SELECT id FROM user WHERE userName="+userName+"'roo1')";
		jdbcOperations.execute(sql);
	}
}
