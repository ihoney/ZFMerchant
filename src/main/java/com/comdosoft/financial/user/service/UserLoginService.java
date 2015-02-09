package com.comdosoft.financial.user.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.zhangfu.Customer;
import com.comdosoft.financial.user.mapper.zhangfu.UserLoginMapper;

@Service
public class UserLoginService {
	@Resource
	private UserLoginMapper userLoginMapper;
	
	/**
	 * 用户登陆
	 * @param customer
	 * @return
	 */
	public int doLogin(Customer customer){
		System.out.println("查看："+customer.getUsername()+"   "+customer.getPassword());
		return userLoginMapper.doLogin(customer);
	}
	
	/**
	 * 找回密码
	 * @param customer
	 */
	public void updatePassword(Customer customer){
		userLoginMapper.updatePassword(customer);
	}
	
	/**
	 * 添加用户
	 * @param customer
	 */
	public void addUser(Customer customer){
		userLoginMapper.addUser(customer);
	}
	
	/**
	 * 查找用户
	 * @param customer
	 * @return
	 */
	public int findUname(Customer customer){
		return userLoginMapper.findUname(customer);
	}
}
