package com.comdosoft.financial.user.controller.api;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.zhangfu.Customer;
import com.comdosoft.financial.user.service.UserLoginService;
import com.comdosoft.financial.user.utils.SysUtils;

/**
 * 
 * 用户登陆
 * <功能描述>
 *
 * @author xfh 2015年2月7日
 *
 */
@RestController
@RequestMapping(value = "/api/user")
public class UserLoginController {
	
	@Resource
	private UserLoginService userLoginService;

	@Value("${passPath}")
	private String passPath;
	
	/**
	 * 用户登陆
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "getApplyList", method = RequestMethod.POST)
	public Response getApplyList(@RequestBody Customer customer) {
		Response response = new Response();
		try {
			customer.setPassword(SysUtils.Encryption(customer.getPassword(),passPath));
			int count = userLoginService.doLogin(customer);
			if(count>0){
				response.setMessage("登陆成功！");
			}else if(count==0){
				response.setMessage("用户名或密码错误！");
			}else{
				response.setMessage("异常登录！");
			}
		} catch (Exception e) {
			response.setMessage("系统异常！");
			//e.printStackTrace();
			return response;
		}
		return response;
	}

	/**
	 * 像手机或者邮箱发送验证
	 * @param number
	 */
	@RequestMapping(value = "sendVerificationCode", method = RequestMethod.GET)
	public void sendVerificationCode(@PathVariable("number") String number){
		
	}
	
	/**
	 * 修改密码
	 * @param customer
	 * @return
	 */
	@RequestMapping(value = "updatePassword", method = RequestMethod.POST)
	public Response updatePassword(@RequestBody Customer customer){
		Response response = new Response();
		try {
			customer.setPassword(SysUtils.Encryption(customer.getPassword(),"C:/Program Files (x86)/password.txt"));
			userLoginService.updatePassword(customer);
			response.setResult("修改成功！");
			return response;
		} catch (Exception e) {
			response.setResult("修改失败！系统异常");
			return response;
		}
	}
	
	/**
	 * 添加用户
	 * @param customer
	 * @return
	 */
	@RequestMapping(value = "userRegistration", method = RequestMethod.POST)
	public Response userRegistration(@RequestBody Customer customer){
		Response response = new Response();
		try {
			customer.setPassword(SysUtils.Encryption(customer.getPassword(),"C:/Program Files (x86)/password.txt"));
			userLoginService.addUser(customer);
			response.setResult("注册成功！");
			return response;
		} catch (Exception e) {
			response.setResult("注册失败！系统异常");
			return response;
		}
	}
}
