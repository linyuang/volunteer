package com.simple.yuc.config;

import com.simple.yuc.service.ApplyService;

public class Constans {
	/*session key*/
	public static final String ATTR_USER = "USER";
	public static final String ATTR_COMMUNITY = "COMMUNITY";
	
	/*路径*/
	public static final String PREFIX = "E:\\YucResource\\";
	
	public static final String USERSYSHEADPATH = "User\\Head\\System\\head.jpg";
	public static final String COMMUNITYSYSHEADPATH = "Community\\Head\\System\\head.jpg";
	public static final String TEMPPATH = "Temp\\";
	public static final String CONFIGTEMPPATH = "Temp_Config\\";
	
	public static final String COMMUNITYHEADPATH = "Community\\Head\\";
	public static final String ACTIVITYPATH = "Activity\\";
	
	/*UserService*/
	//登录功能
	public static final String MAP_USERSERVICE_USER = "USER";
	public static final String MAP_USERSERVICE_INFO = "INFO";
	
	public static final int USER_LOGINSUCCESS = 400;//登陆成功
	public static final int USER_NOTEXIST = 401;//用户不存在
	public static final int USER_WRONGPASSWORD = 402;//密码错误
	//注册验证
	public static final int USER_EXIST = 403;//用户已存在
	public static final int USER_EMAILEXIST = 404;//邮箱已存在
	public static final int USER_REGISTERVAILDSUCCESS = 405;//注册验证通过
	//注册功能(不包括验证
	public static final int USER_REGISTERSUCCESS = 406;//注册成功
	//用户更新
	public static final int USER_UPDATESUCCESS = 407;//更新成功
	//修改密码
	public static final int USER_UPDATEPASSWORDSUCCESS = 408;//密码修改成功
	public static final int USER_UPDATEPASSWORDFAILED = 409;//密码修改失败
	//返回用户列表成功
	public static final int USER_USERLISTSUCCESS = 410;//密码修改成功
	//冻结相关
	public static final int USER_ENABLE = 411;
	public static final int USER_UNABLE = 412;
	public static final int USER_ABLEFAILDED = 413;
	
	
	/*CommunityService*/
	public static final String MAP_COMMUNITYSERVICE_COMMUNITY = "COMMUNITY";
	public static final String MAP_COMMUNITYSERVICE_INFO = "INFO";
	public static final int COMMUNITY_LOGINSUCCESS = 500;//登陆成功
	public static final int COMMUNITY_NOTEXIST = 501;//组织不存在
	public static final int COMMUNITY_WRONGPASSWORD = 502;//密码错误
	//注册验证
	public static final int COMMUNITY_EXIST = 503;//用户已存在
	public static final int COMMUNITY_REGISTERVAILDSUCCESS = 505;//注册验证通过
	public static final int COMMUNITY_REGISTERSUCCESS = 506;//注册成功
	//上传头像
	public static final int COMMUNITY_UPLOADHEADFAILED = 507;//文件写入失败
	public static final int COMMUNITY_UPLOADHEADSUCCESS = 508;//文件写入成功
	//组织更新
	public static final int COMMUNITY_UPDATESUCCESS = 509;//更新成功
	//组织修改密码
	public static final int COMMUNITY_UPDATEPASSWORDSUCCESS = 510;//密码修改成功
	public static final int COMMUNITY_UPDATEPASSWORDFAILED = 511;//密码修改失败
	//成功返回列表
	public static final int COMMUNITY_GETLISTSUCCESS = 512;
	//组织冻结
	public static final int COMMUNITY_ENABLE = 513;
	public static final int COMMUNITY_UNABLE = 514;
	public static final int COMMUNITY_ABLEFAILDED = 515;
	//
	public static final int COMMUNITY_FINDOND = 516;
	
	//AdminService
	//登录功能
	public static final String MAP_ADMINSERVICE_ADMIN = "ADMIN";
	public static final String MAP_ADMINSERVICE_INFO = "INFO";
	
	public static final int ADMIN_LOGINSUCCESS = 600;//登陆成功
	public static final int ADMIN_UNABLE = 601;//被冻结
	public static final int ADMIN_NOTEXIST = 602;//用户不存在
	public static final int ADMIN_WRONGPASSWORD = 603;//错误密码
	
	/*activityService*/
	public static final String MAP_ACTIVITYSERVICE_ACTIVITY = "ACTIVITY";
	public static final String MAP_ACTIVITYSERVICE_INFO = "INFO";
	
	//上传文件
	public static final int ACTIVITY_UPLOADFAILED = 600;//文件写入失败
	public static final int ACTIVITY_UPLOADSUCCESS = 601;//文件写入成功
	
	//发布活动
	public static final int ACTIVITY_ADDSUCCESS = 602;//发布活动成功
	public static final int ACTIVITY_ADDFAILDED = 603;//发布活动失败
	//查询
	public static final int ACTIVITY_QUERYBYCOMMUNITYSUCCESS = 604;//查找组织所有活动
	public static final int ACTIVITY_QUERYBYIDSUCCESS = 605;//查找组织所有活动
	
	//冻结活动
	public static final int ACTIVITY_UNABLESUCCESS = 606;//冻结活动成功
	public static final int ACTIVITY_UNABLEFAILDED = 607;//冻结活动失败
	//激活活动
	public static final int ACTIVITY_ENABLESUCCESS = 610;//冻结活动成功
	public static final int ACTIVITY_ENABLEFAILDED = 611;//冻结活动失败
	
	//活动结束
	public static final int ACTIVITY_FINISH = 608;//活动结束成功
	//活动列表
	public static final int ACTIVITY_LIST = 609;//活动列表
	//推荐活动
	public static final int ACTIVITY_PRIORITY = 610;//活动列表
	
	
	/*ApplyService*/
	public static final String MAP_APPLYSERVICE_APPLY = "APPLY";
	public static final String MAP_APPLYSERVICE_INFO = "INFO";
	
	public static final int APPLY_ADDSUCCESS = 700;//申请成功
	public static final int APPLY_HASJOIN = 701;//已经申请其他活动
	public static final int APPLY_ADDFAILDED = 702;//申请失败
	
	public static final int APPLY_DELETESUCCESS = 703;//申请成功
	public static final int APPLY_DELETEFAILDED = 704;//申请失败
	
	public static final int APPLY_INTERVIEW = 705;//面试
	
	public static final int APPLY_GETINTERVIEWSUCCESS = 706;//获取列表成功
	public static final int APPLY_GETINTERVIEWFAILDED = 707;//列表不存在
}
