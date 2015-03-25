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
import com.comdosoft.financial.user.domain.zhangfu.Agent;
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
	
	/**
     * 发送手机验证码(注册)
     * 
     * @param number
     */
    @RequestMapping(value = "sendPhoneVerificationCodeReg", method = RequestMethod.POST)
    public Response sendPhoneVerificationCodeReg(@RequestBody Map<String, Object> map) {
        try {
            String str = SysUtils.getCode();
            String phone = (String)map.get("codeNumber");//手机号
            try {
                Boolean is_sucess = SysUtils.sendPhoneCode("感谢您注册华尔街金融，您的验证码为："+str, phone);
                if(!is_sucess){
                	return Response.getError("获取验证码失败！");
                }else{
                    return Response.getSuccess(str);
                }
            } catch (IOException e) {
                e.printStackTrace();
                return Response.getError("系统异常！");
            }
        } catch (Exception e) {
        	e.printStackTrace();
            return Response.getError("系统异常！");
        }
    }
    
    /**
	 * 注册代理商
	 * @param customer
	 * @return
	 */
	@RequestMapping(value = "userRegistration", method = RequestMethod.POST)
	public Response userRegistration(@RequestBody Map<String, Object> map){
		try{
			//检查该代理商账号是否存在
			Customer customer = new Customer();
			Agent agent =new Agent();
			customer.setUsername((String) map.get("userId"));
			/*if(agentLoginService.findUname(customer)>0){
				return Response.getError("用户已注册！");
			}else{*/
				//查找该城市中是否有状态为正常的代理商
				customer.setStatus(Customer.STATUS_NORMAL);
				customer.setCityId((Integer)map.get("cityId"));
				if(agentLoginService.judgeCityId(customer)>0){
					return Response.getError("该城市已有相关代理商！");
				}else{
					//向用户表添加数据
					customer.setPassword((String)map.get("passworda"));
					//customer.setAccountType((Integer)map.get("accountType"));
					customer.setTypes(Customer.TYPE_AGENT);
					customer.setStatus(Customer.STATUS_NON_ACTIVE);
					customer.setPhone((String)map.get("phone"));
					customer.setEmail((String)map.get("email"));
					customer.setName((String)map.get("name"));
					customer.setIntegral(0);//积分
					agentLoginService.addUser(customer);
					if(customer.getId()==null){
						return Response.getError("申请失败！");
					}else{
						//向代理商表添加数据
						Object ob = agentLoginService.getAgentCode(Agent.PARENT_ID);
						if(ob==null){
							agent.setCode("001");
						}else{
							String str=String.valueOf(Integer.parseInt((String)ob)+1);
							if(str.length()==1){
								str="00"+str;
							}
							if(str.length()==2){
								str="0"+str;
							}
							agent.setCode(str);
						}
						agent.setName((String)map.get("name"));
						//agent.setCardId((String)map.get("cityId"));
						agent.setTypes((Integer)map.get("types"));
						agent.setCompanyName((String)map.get("companyName"));
						agent.setBusinessLicense((String)map.get("licenseCode"));
						agent.setPhone((String)map.get("phone"));
						agent.setEmail((String)map.get("email"));
						agent.setCustomerId(customer.getId());
						//agent.setAddress((String)map.get("address"));
						agent.setFormTypes(Agent.FROM_TYPE_1);
						agent.setStatus(Agent.STATUS_1);
						agent.setParentId(Agent.PARENT_ID);
						agent.setIsHaveProfit(Agent.IS_HAVE_PROFIT_N);
						//agent.setCardIdPhotoPath((String)map.get("cardIdPhotoPath"));
						//agent.setTaxRegisteredNo((String)map.get("taxRegisteredNo"));
						//agent.setLicenseNoPicPath((String)map.get("licenseNoPicPath"));
						//agent.setTaxNoPicPath((String)map.get("taxNoPicPath"));
						agent.setCardId((String)map.get("card"));
						agentLoginService.addAgent(agent);
						return Response.getSuccess("注册成功！");
					}
				}
			//}
		}catch(Exception e){
			logger.error("注册代理商异常！",e);
			return Response.getError("请求失败！");
		}
		}
    
}
