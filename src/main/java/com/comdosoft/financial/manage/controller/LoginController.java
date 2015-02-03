package com.comdosoft.financial.manage.controller;

import javax.servlet.http.HttpServletRequest;

import nl.captcha.Captcha;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.comdosoft.financial.manage.domain.Response;
import com.comdosoft.financial.manage.domain.zhangfu.Customer;
import com.comdosoft.financial.manage.service.CustomerService;
import com.comdosoft.financial.manage.service.SessionService;
import com.google.common.base.Strings;

@Controller
public class LoginController {
	
	private Logger LOG = LoggerFactory.getLogger(LoginController.class);
	
	@Value("${url.login}")
	private String loginUrl;
	@Autowired
	private SessionService sessionService;
	@Autowired
	private CustomerService customerService;
	
	@RequestMapping(value="login",method=RequestMethod.GET)
	public String loginGet(){
		return "login";
	}

	@RequestMapping(value="login",method=RequestMethod.POST)
	@ResponseBody
	public Response loginPost(String passport,String password,String captcha,
			HttpServletRequest request){
		LOG.info("{},登陆",passport);
		Captcha sessionCaptcha = (Captcha) request.getSession().getAttribute(Captcha.NAME);
		if(Strings.isNullOrEmpty(passport)){
			return Response.getError("账号不能为空！");
		}
		if(Strings.isNullOrEmpty(password)){
			return Response.getError("密码不能为空！");
		}
		if(Strings.isNullOrEmpty(captcha)){
			return Response.getError("验证码不能为空！");
		}
		if(!captcha.equals(sessionCaptcha.getAnswer())) {
			return Response.getError("验证码不正确！");
		}
		Customer customer = customerService.login(passport, password);
		if(customer==null) {
			return Response.getError("用户名或密码不正确！");
		}
		sessionService.storeLoginInfo(request, customer);
		LOG.info("{},登陆成功",passport);
		return Response.getSuccess("/index");
	}

	@RequestMapping(value="logout",method=RequestMethod.GET)
	public String logout(HttpServletRequest request){
		sessionService.clear(request);
		return "redirect:"+loginUrl;
	}
	
}
