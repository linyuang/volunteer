package com.simple.yuc.config;

import javax.servlet.Filter;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import com.simple.yuc.listener.SessionAttributeListener;
import com.simple.yuc.service.UserService;

public class YucWebInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
	
  @Override
  protected Class<?>[] getRootConfigClasses() {
    return new Class<?>[] { RootConfig.class};
  }

 //指定配置类
  @Override
  protected Class<?>[] getServletConfigClasses() {
    return new Class<?>[] { WebConfig.class };
  }

  //将DispatcherServlet映射到"/"
  @Override
  protected String[] getServletMappings() {
    return new String[] { "/" };
  }
  
  @Override 
  protected Filter[] getServletFilters() {
		return new Filter[] {new CharacterEncodingFilter("UTF-8", true)};
	}
  
  //文件上传相关
  @Override
  protected void customizeRegistration(Dynamic registration) {
	  registration.setAsyncSupported(true);
	  registration.setMultipartConfig(
			  new MultipartConfigElement(
					  Constans.PREFIX+Constans.CONFIGTEMPPATH, 2097152, 4194304, 0));
	  System.out.println(Constans.PREFIX+Constans.CONFIGTEMPPATH);
  }

  
	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		// TODO Auto-generated method stub
		super.onStartup(servletContext);
		servletContext.addFilter("name", new CharacterEncodingFilter("UTF-8", true))
		.addMappingForUrlPatterns(null, false, "/*");
	}

  
  
}