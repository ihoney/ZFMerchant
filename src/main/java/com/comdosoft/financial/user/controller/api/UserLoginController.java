package com.comdosoft.financial.user.controller.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

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
	@RequestMapping(value = "studentLogin", method = RequestMethod.POST)
	public Response studentLogin(@RequestBody Customer customer) {
		try {
			Object customerId = userLoginService.doLogin(customer);
			if(customerId!=null){
				userLoginService.updateLastLoginedAt(customer);
				return Response.getSuccess(customerId);
			} else {
				return Response.getError("用户名或密码错误！");
			}
		} catch (Exception e) {
			return Response.getError("系统异常！");
		}
	}

	/**
	 * 发送手机验证码
	 * @param number
	 */
	@RequestMapping(value = "sendPhoneVerificationCode/{codeNumber}", method = RequestMethod.GET)
	public Response sendPhoneVerificationCode(@PathVariable("codeNumber") String codeNumber,HttpSession session){
		try{
			Customer customer = new Customer();
			customer.setUsername(codeNumber);
			if(userLoginService.findUname(customer)==0){
				char[] randchar=SysUtils.getRandNum(6);
				String str ="";
				for(int i=0;i<randchar.length;i++){
					str+=randchar[i];
				}
				customer.setPassword("0");
				customer.setCityId(0);
				customer.setDentcode(str);
				userLoginService.addUser(customer);
				return Response.getSuccess(str);
			}else{
				return Response.getError("该用户已注册！");
			}
		}catch(Exception e){
			return Response.getError("获取验证码失败！");
		}
	}
	
	/**
	 * 发送邮箱验证
	 * @param number
	 */
	@RequestMapping(value = "sendEmailVerificationCode/{codeNumber}", method = RequestMethod.GET)
	public void sendEmailVerificationCode(@PathVariable("codeNumber") String codeNumber){
		
	}
	
	/**
	 * 找回密码
	 * @param customer
	 * @return
	 */
	@RequestMapping(value = "updatePassword", method = RequestMethod.POST)
	public Response updatePassword(@RequestBody Customer customer){
		try {
			if(userLoginService.findUname(customer)>0){
				userLoginService.updatePassword(customer);
				return Response.getSuccess("找回密码成功！");
			}else{
				return Response.getError("用户名错误！");
			}
		} catch (Exception e) {
			return Response.getError("修改失败！系统异常");
		}
	}
	
	/**
	 * 注册用户
	 * @param customer
	 * @return
	 */
	@RequestMapping(value = "userRegistration", method = RequestMethod.POST)
	public Response userRegistration(@RequestBody Customer customer,HttpSession session){
		try {
			customer.setTypes(Customer.TYPE_CUSTOMER);
			customer.setStatus(Customer.STATUS_NON_ACTIVE);
			//if(userLoginService.findUname(customer)==0){
			if(!customer.getAccountType()){
				if(customer.getCode().equals(userLoginService.findCode(customer))){
						customer.setPhone(customer.getUsername());
					userLoginService.updateUser(customer);
					return Response.getSuccess("注册成功！");
				}else{
					return Response.getError("验证码错误！");
				}
			}else{
				customer.setEmail(customer.getUsername());
				userLoginService.updateUser(customer);
				return Response.getSuccess("激活链接已发送至你的邮箱，请点击激活。");
			}
			//}else{
				//return Response.getError("用户已存在！");
			//}
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("注册失败！系统异常");
		}
	}
}
