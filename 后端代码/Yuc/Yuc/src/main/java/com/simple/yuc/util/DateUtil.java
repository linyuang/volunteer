package com.simple.yuc.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
	
	//返回当前时间
	public static String getDate(){
		SimpleDateFormat dt = new SimpleDateFormat("yyyyMMddHHmmss");
		return dt.format(new Date());
	}
}
