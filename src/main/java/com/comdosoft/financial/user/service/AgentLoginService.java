package com.comdosoft.financial.user.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.zhangfu.Customer;
import com.comdosoft.financial.user.mapper.zhangfu.AgentLoginMapper;
import com.comdosoft.financial.user.mapper.zhangfu.UserLoginMapper;

@Service
public class AgentLoginService {
	@Resource
	private AgentLoginMapper agentLoginMapper;
	
	/**
	 * 用户登陆
	 * @param customer
	 * @return
	 */
	public Customer doLogin(Customer customer){
		Customer cu = new Customer();
		cu = agentLoginMapper.doLogin(customer);
		
		return cu;
	}
	
	/**
	 * 修改登陆时间
	 * @param customer
	 */
	public void updateLastLoginedAt(Customer customer){
		agentLoginMapper.updateLastLoginedAt(customer);
	}
	
	/**
	 * 代理商登陆后获的权限
	 * @param customer
	 * @return
	 */
	public List<Map<String, String>> Toestemming(Customer customer){
		return agentLoginMapper.Toestemming(customer);
	}
}
