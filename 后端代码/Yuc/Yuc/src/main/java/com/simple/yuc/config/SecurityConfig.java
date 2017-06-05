package com.simple.yuc.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.simple.yuc.service.CustomUserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private CustomUserService customUserService;
	
  @Override
  protected void configure(HttpSecurity http) throws Exception {
	  http
      	.authorizeRequests()
          .antMatchers("/test.jsp").hasAnyRole("ADMIN","USER","COMMUNITY")
      .and()
      	.formLogin()
      		.usernameParameter("userName").passwordParameter("password").permitAll()
      .and().httpBasic()
      .and()
        .csrf().disable();
//        	.ignoringAntMatchers("/user/*")
//        	.ignoringAntMatchers("/community/*")
//        	.ignoringAntMatchers("/activity/*");
  }
  
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	  auth.userDetailsService(customUserService);
  }
  
  @Override
  public void configure(WebSecurity web) throws Exception {
      web.ignoring().antMatchers("/resources/**");
  }
  
//  @Bean
//  CorsConfigurationSource corsConfigurationSource() {
//	  CorsConfiguration configuration = new CorsConfiguration();
//	  configuration.setAllowedOrigins(Arrays.asList("https://192.168.191.1:8080"));
//	  configuration.setAllowedMethods(Arrays.asList("GET","POST"));
//	  UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//	  source.registerCorsConfiguration("/**", configuration);
//	  return source;
//  }
}
