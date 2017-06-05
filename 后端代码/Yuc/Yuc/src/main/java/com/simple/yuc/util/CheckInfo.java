package com.simple.yuc.util;

public class CheckInfo {
	//正则表达式
	//以大小写字母开头、包含数字的1到16位字符
	public final static String REX_USERNAME = "^[a-zA-z][a-zA-Z0-9_]{1,16}$";
	//以汉字、下划线、大小写字母、数字开头的1到16位字符
	public final static String REX_NAME = "^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$";
	//以字母开头，长度在6~18之间，只能包含字母、数字和下划线
	public final static String REX_PASSWORD = "^[a-zA-Z]\\w{5,17}$";
	//验证邮箱
	public final static String REX_EMAIL = "^w+[-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$";
	//验证手机
	public final static String REX_CELLPHONE ="^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$";
	//验证国内电话
	public final static String REX_PHONE = "d{3}-d{8}|d{4}-d{7}";
	
	
	public boolean checkUserName(String userName){
		return userName.matches(REX_USERNAME);
	}
	
	public boolean checkPassword(String password){
		return password.matches(REX_PASSWORD);
	}
	
	public boolean checkName(String name){
		return name.matches(REX_NAME);
	}
	
	public boolean checkEmail(String email){
		return email.matches(REX_EMAIL);
	}
	
	public boolean checkCellPhone(String cellPhone){
		return cellPhone.matches(REX_CELLPHONE);
	}
	
	public boolean checkPhone(String phone){
		return phone.matches(REX_PHONE);
	}
	
	public static void main(String[] args) {
		CheckInfo i = new CheckInfo();
		System.out.println(i.checkUserName("q111"));;
	}
}
