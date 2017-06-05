package com.simple.yuc.listener;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.simple.yuc.config.Constans;
import com.simple.yuc.entity.Community;
import com.simple.yuc.entity.User;
import com.simple.yuc.service.UserService;

public class SessionAttributeListener implements ServletContextListener,HttpSessionAttributeListener{

	private UserService userService;
	private WebApplicationContext springContext; 
	
	private Map<String, HttpSession> userMap = new HashMap<String, HttpSession>();
	private Map<String, HttpSession> communityMap = new HashMap<String, HttpSession>();
	 
	
    public void loginEvent(HttpSessionBindingEvent event) {  
    	String name = event.getName();
    	if(name.equals(Constans.ATTR_USER)){
    		User user = (User) event.getValue();
    		String userName = user.getUserName();
    		
    		System.out.println("userName:======"+userName);
    		
    		HttpSession session = userMap.get(userName);
    		if(null!=session){ 
    			if(userService==null){
    				System.out.println("userService is null");
    			}
    			
    			userService.handleLoginContradict(userName);
                session.invalidate();
                userMap.remove(userName);
    		}
            userMap.put(userName, event.getSession());
    	}else if(name.equals(Constans.ATTR_COMMUNITY)){
    		Community community = (Community) event.getValue();
    		String userName = community.getUserName();
    		
    		HttpSession session = communityMap.get(userName);  
    		if(null!=session){
    			 session.removeAttribute(userName);  
    	         session.invalidate();
    		}
            communityMap.put(userName, event.getSession());
    	}
    }
    
    public void loginOutEvent(HttpSessionBindingEvent event){
    	String name = event.getName();
    	if(name.equals(Constans.ATTR_USER)){
    		User user = (User) event.getValue();
    		String userName = user.getUserName();
    		
    		userMap.remove(userName);
    	}else if(name.equals(Constans.ATTR_COMMUNITY)){
    		Community community = (Community) event.getValue();
    		String userName = community.getUserName();
    		
    		communityMap.remove(userName);
    	}
    }


	public void attributeAdded(HttpSessionBindingEvent event) {
		// TODO Auto-generated method stub
		System.out.println("----------------------add");
		System.out.println("name is :"+event.getName());
		loginEvent(event);
	}

	public void attributeRemoved(HttpSessionBindingEvent event) {
		// TODO Auto-generated method stub
		loginOutEvent(event);
	}

	public void attributeReplaced(HttpSessionBindingEvent event) {
		// TODO Auto-generated method stub
		
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		// TODO Auto-generated method stub
		 springContext = WebApplicationContextUtils.getRequiredWebApplicationContext(
				 sce.getServletContext());
		 
		 if(springContext!=null){
			 userService = (UserService) springContext.getBean("UserService");
		 }else{
			 System.out.println("springContext failed");
		 }
		 
		 System.out.println("start.....................................");
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		// TODO Auto-generated method stub
		
	}

	


}
