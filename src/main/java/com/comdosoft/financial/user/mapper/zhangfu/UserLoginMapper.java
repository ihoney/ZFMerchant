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
	Object doLogin(Customer customer);
	
	/**
	 * 找回密码
	 * @param customer
	 */
	void updatePassword(Customer customer);
	
	/**
	 * 添加用户
	 * @param customer
	 */
	void addUser(Customer customer);
	
	/**
	 * 修改注册用户
	 * @param customer
	 */
	void updateUser(Customer customer);
	
	/**
	 * 查找用户
	 * @param customer
	 * @return
	 */
	int findUname(Customer customer);
	
	/**
	 * 修改登录时间
	 * @param customer
	 */
	void updateLastLoginedAt(Customer customer);
	
	/**
	 * 取出验证码
	 * @param customer
	 * @return
	 */
	String findCode(Customer customer);
}
