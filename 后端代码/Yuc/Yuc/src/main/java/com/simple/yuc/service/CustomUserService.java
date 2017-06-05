package com.simple.yuc.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.simple.yuc.entity.Admin;
import com.simple.yuc.entity.Authority;
import com.simple.yuc.entity.Community;
import com.simple.yuc.entity.User;
import com.simple.yuc.repository.AdminAuthorityRepository;
import com.simple.yuc.repository.AdminRepository;
import com.simple.yuc.repository.CommunityAuthorityRepository;
import com.simple.yuc.repository.CommunityRepository;
import com.simple.yuc.repository.UserAuthorityRepository;
import com.simple.yuc.repository.UserRepository;

@Component
public class CustomUserService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserAuthorityRepository userAuthorityRepository;
	
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private AdminAuthorityRepository adminAuthorityRepository;
	
	@Autowired
	private CommunityRepository communityRepository;
	@Autowired
	private CommunityAuthorityRepository communityAuthorityRepository;
	
	@Override
	public UserDetails loadUserByUsername(String userName)
			throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		boolean enable = false;
		User user = userRepository.findUserByUserName(userName);
		Community community = communityRepository.findCommunityByUserName(userName);
		Admin admin = adminRepository.findAdminByUserName(userName);
		
		if(user==null && community==null && admin==null){
			throw new UsernameNotFoundException("Username not found");
		}
		
		org.springframework.security.core.userdetails.User securityUser = null;
		
		if(null!=user){
			enable = user.getEnable().equals("1")?true:false;
			securityUser = new org.springframework.security.core.userdetails.User(
					user.getUserName(),user.getPassword(),enable,true,true,true,getGrantedAuthorities(user));
		}
		
		if(null!=community){
			enable = community.getEnable().equals("1")?true:false;
			securityUser = new org.springframework.security.core.userdetails.User(
					community.getUserName(),community.getPassword(),enable,true,true,true,getGrantedAuthorities(community));
		}
		
		if(null!=admin){
			enable = admin.getEnable().equals("1")?true:false;
			securityUser = new org.springframework.security.core.userdetails.User(
					admin.getUserName(),admin.getPassword(),enable,true,true,true,getGrantedAuthorities(admin));
		}
		
		return securityUser;
	}
	
	private List<GrantedAuthority> getGrantedAuthorities(User user){
		List<GrantedAuthority>  result = new ArrayList<GrantedAuthority>();
		
		List<Authority> authorities = userAuthorityRepository.findAllAuthorityByUserId(user.getId());
		for(Authority authority:authorities){
			result.add(new SimpleGrantedAuthority(
					authority.getName()));
		}
		return result;
	}
	
	private List<GrantedAuthority> getGrantedAuthorities(Community community){
		List<GrantedAuthority>  result = new ArrayList<GrantedAuthority>();
		
		List<Authority> authorities = communityAuthorityRepository.findAllAuthorityByCommunityId(community.getId());
		for(Authority authority:authorities){
			result.add(new SimpleGrantedAuthority(
					authority.getName()));
		}
		
		return result;
	}
	
	private List<GrantedAuthority> getGrantedAuthorities(Admin admin){
		List<GrantedAuthority>  result = new ArrayList<GrantedAuthority>();
		
		List<Authority> authorities = adminAuthorityRepository.findAllAuthorityByAdminId(admin.getId());
		for(Authority authority:authorities){
			result.add(new SimpleGrantedAuthority(
					authority.getName()));
		}
		
		return result;
	}

	
	
}
