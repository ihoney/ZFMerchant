package com.comdosoft.financial.user.service;

import java.util.HashMap;
import java.util.Map;

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
	public Map<Object, Object> doLogin(Customer customer){
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
	 * 修改注册用户
	 * @param customer
	 */
	public void updateUser(Customer customer){
		userLoginMapper.updateUser(customer);
	}
	
	/**
	 * 修改邮箱注册状态
	 * @param customer
	 */
	public void activationEmail(Customer customer){
		userLoginMapper.activationEmail(customer);
	}
	
	/**
	 * 查找用户
	 * @param customer
	 * @return
	 */
	public int findUname(String username,Byte type,Byte status){
		Map<Object, Object> map = new HashMap<Object, Object>();
		map.put("username", username);
		map.put("type", type);
		map.put("status", status);
		return userLoginMapper.findUname(map);
	}
	
	/**
	 * 修改登陆时间
	 * @param customer
	 */
	public void updateLastLoginedAt(Customer customer){
		userLoginMapper.updateLastLoginedAt(customer);
	}
	
	/**
	 * 取出验证码
	 * @param customer
	 * @return
	 */
	public String findCode(Customer customer){
		return userLoginMapper.findCode(customer);
	}
	
	/**
	 * 查找假注册状态
	 * @param customer
	 * @return
	 */
	public int findUnameAndStatus(Customer customer){
		return userLoginMapper.findUnameAndStatus(customer);
	}
	
	/**
	 * 修改验证码
	 * @param customer
	 */
	public void updateCode(Customer customer){
		userLoginMapper.updateCode(customer);
	}
	
	/**
	 * 注册查找状态
	 * @param customer
	 * @return
	 */
	public int findUserAndStatus(Customer customer){
		return userLoginMapper.findUserAndStatus(customer);
	}
}
