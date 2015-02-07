package com.comdosoft.financial.user.mapper.zhangfu;



import com.comdosoft.financial.user.domain.zhangfu.Customer;



/**
 * 用户登陆
 * @author xianfeihu
 *
 */
public interface UserLoginMapper {
	
	/**
	 * 用户登陆
	 * @param customer
	 * @return
	 */
	int doLogin(Customer customer);
	
	/**
	 * 修改密码
	 * @param customer
	 */
	void updatePassword(Customer customer);
	
	/**
	 * 添加用户
	 * @param customer
	 */
	void addUser(Customer customer);
}
