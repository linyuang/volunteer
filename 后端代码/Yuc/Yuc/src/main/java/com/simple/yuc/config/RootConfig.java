package com.simple.yuc.config;

import java.util.regex.Pattern;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;
import org.springframework.core.type.filter.RegexPatternTypeFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.simple.yuc.config.RootConfig.WebPackage;

@Configuration
@Import({DataConfig.class,SecurityConfig.class,CachingConfig.class,WebSocketStompConfig.class})
@ComponentScan(basePackages={"com.simple.yuc"},
    excludeFilters={
		@Filter(type=FilterType.CUSTOM, value=WebPackage.class),
        @Filter(type=FilterType.ANNOTATION, value=EnableWebMvc.class)
    }
)
public class RootConfig {
	public static class WebPackage extends RegexPatternTypeFilter {
	    public WebPackage() {
	      super(Pattern.compile("com\\.simple\\.yuc\\.web"));
	    }    
	  }
	
}
