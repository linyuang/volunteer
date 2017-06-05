package com.simple.yuc.repository.custom;



public interface ApplyRepositoryCustom {
	void deleteByActId(int[] ids,String[] enables);
	
	void deleteByUserNameAndEnable(String userName,String enable);
}
