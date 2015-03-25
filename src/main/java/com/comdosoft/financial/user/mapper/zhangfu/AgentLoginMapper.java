package com.comdosoft.financial.user.mapper.zhangfu;



import java.util.List;
import java.util.Map;

import com.comdosoft.financial.user.domain.zhangfu.Customer;



/**
 * 用户登陆
 * @author xianfeihu
 *
 */
public interface AgentLoginMapper {
	
	/**
	 * 用户登陆
	 * @param customer
	 * @return
	 */
	Customer doLogin(Customer customer);
	
	/**
	 * 修改登录时间
	 * @param customer
	 */
	void updateLastLoginedAt(Customer customer);
	
	/**
	 * 代理商登陆后获得权限
	 * @param customer
	 * @return
	 */
	List<Map<String, String>> Toestemming(Customer customer);
}
