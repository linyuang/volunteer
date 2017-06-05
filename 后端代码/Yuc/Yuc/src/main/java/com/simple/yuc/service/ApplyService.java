package com.simple.yuc.service;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.simple.yuc.entity.Apply;
import com.simple.yuc.entity.User;
import com.simple.yuc.repository.ApplyRepository;

@Component
public class ApplyService {
	
	private static final Logger logger = LoggerFactory.getLogger(ApplyService.class);
	
	@Autowired
	private ApplyRepository applyRepository;

	@Autowired
	private UserService userService;
	
	//用户申请
	public boolean add(Apply apply){
		if(!isExist(apply.getUserId(), apply.getActId())){
			applyRepository.saveAndFlush(apply);
			return true;
		}
		return false;
	}
	
	//用户取消申请
	public boolean delete(Long userId,Long actId){
		Apply apply = applyRepository.findApplyByUserIdAndActId(userId, actId);
		if(null!=apply){
			applyRepository.delete(apply);
			return true;
		}
		return false;
	}
	
	//用户是否申请过其他活动
	//0\1
	public boolean isApply(Long userId,String enable){
		List<Apply> applies =applyRepository.findApplyByUserIdAndEnable(userId,enable);
		if(null!=applies){
			return true;
		}
		return false;
	}
	
	
	//是否存在本申请
	public boolean isExist(Long userId,Long actId){
		Apply apply = applyRepository.findApplyByUserIdAndActId(userId, actId);
		if(null!=apply){
			return true;
		}
		return false;
	}
	
	
	//删除一个活动下的所有报名信息
	public void deleteByActId(Long actId){
		List<Apply> applies = applyRepository.findAllByActId(actId);
		applyRepository.delete(applies);
	}
	
	//返回一个活动下的报名用户信息
	public List<User> findUserByActIdAndEnable(Long actId,String enable,int page,int size,Sort sort){
		List<Long> ids = new LinkedList<Long>();
		Pageable pageable = new PageRequest(page,size,sort);
		Page<Apply> applies = applyRepository.findByActIdAndEnable(actId,enable,pageable);
		
		for(Apply apply:applies.getContent()){
			ids.add(apply.getUserId());
		}
		
		List<User> users = new LinkedList<User>();
		for(User user:users){
			user.setPassword("");
		}
		return userService.getUsersByIds(ids);
	}
	
	//活动结束修改报名表状态
	public void updateAbleByActId(Long actId,String enable){
		List<Apply> applies = applyRepository.findAllByActId(actId);
		for(Apply apply:applies){
			apply.setEnable(enable);
		}
		applyRepository.save(applies);
	}
	
	
	public Apply findByUserIdAndActId(Long userId,Long actId){
		return applyRepository.findApplyByUserIdAndActId(userId, actId);
	}
	
	public Apply save(Apply apply){
		return applyRepository.save(apply);
	}
	
	public void deleteByActId(int[] ids, String[] enables){
		applyRepository.deleteByActId(ids, enables);
	}
	
	public void deleteByUserIdAndEnable(String userName,String enable){
		applyRepository.deleteByUserNameAndEnable(userName, enable);
	}
	
	//修改参加活动用户状态
	//enable:0 根据用户id和活动未开始找条目
	//enable:1 根据用户id和活动进行中找条目
	//enable:2 根据用户id和活动已结束找条目
	//这里enable一般为0,t_enable一般为1
//	public void updateAbleByUserId(Long userId,String enable,String t_enable){
//		
//		List<Apply> applies = applyRepository.findApplyByUserIdAndEnable(userId, t_enable);
//		for(Apply apply:applies){
//			apply.setEnable(t_enable);
//		}
//		applyRepository.save(applies);
//	}
//	
//	public void deleteByUserIdAndActId(Long userId,Long actId){
//		applyRepository.
//	}
}
