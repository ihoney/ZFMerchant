package com.comdosoft.financial.manage.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.comdosoft.financial.manage.service.SessionService;

public class LoginInterceptor extends HandlerInterceptorAdapter {
	
	private static final Logger LOG = LoggerFactory.getLogger(LoginInterceptor.class);
	
	private String loginUrl;
	private SessionService sessionService;

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		boolean logined = sessionService.isLogined(request);
		if(!logined){
			response.sendRedirect(request.getContextPath()+loginUrl);
		}
		return logined;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		LOG.debug("login post handle:{}",request.getRequestURI());
		modelAndView.addObject("customer", sessionService.getLoginInfo(request));
	}

	public void setLoginUrl(String loginUrl) {
		this.loginUrl = loginUrl;
	}

	public void setSessionService(SessionService sessionService) {
		this.sessionService = sessionService;
	}

}
