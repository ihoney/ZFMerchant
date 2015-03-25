package com.comdosoft.financial.user.controller.api;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.MailReq;
import com.comdosoft.financial.user.domain.zhangfu.Customer;
import com.comdosoft.financial.user.service.AgentLoginService;
import com.comdosoft.financial.user.service.MailService;
import com.comdosoft.financial.user.service.UserLoginService;
import com.comdosoft.financial.user.utils.SysUtils;

/**
 * 
 * 用户登陆 <功能描述>
 *
 * @author xfh 2015年2月7日
 *
 */
@RestController
@RequestMapping(value = "/api/agent")
public class AgentLoginController {
	private static final Logger logger = Logger.getLogger(AgentLoginController.class);

    @Resource
    private AgentLoginService agentLoginService;

    /**
	 * 代理商登陆
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "agentLogin", method = RequestMethod.POST)
	public Response agentLogin(@RequestBody Customer customer) {
		try {
			customer.setTypes(Customer.TYPE_AGENT);
			customer.setStatus(Customer.STATUS_NORMAL);
			customer.setPassword(SysUtils.string2MD5(customer.getPassword()));
			Customer tomer = agentLoginService.doLogin(customer);
			if(tomer!=null){
				agentLoginService.updateLastLoginedAt(customer);
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("customer", tomer);
				//登陆成功并且获得权限
				map.put("Machtigingen", agentLoginService.Toestemming(customer));
				return Response.getSuccess(map);
			} else {
				return Response.getError("用户名/密码错误！账号不可用！");
			}
		} catch (Exception e) {
			logger.error("代理商登陆异常！",e);
			return Response.getError("系统异常！");
		}
	}
    
}
