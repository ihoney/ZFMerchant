package com.comdosoft.financial.user.controller.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.zhangfu.Customer;
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.service.CustomerService;
import com.comdosoft.financial.user.service.MessageReceiverService;
import com.comdosoft.financial.user.utils.SysUtils;

/**
 * 我的信息<br>
 * <功能描述>
 *
 * @author zengguang 2015年2月7日
 *
 */
@RestController
@RequestMapping(value = "/api/customers")
public class CustomerAPI {

    @Resource
    private CustomerService customerService;
    @Resource
    private MessageReceiverService messageReceiverService;

    /**
     * 日志记录器
     */
    private static final Logger logger = Logger.getLogger(CustomerAPI.class);

    /**
     * 获取用户信息
     * 
     * @param id
     */
    @RequestMapping(value = "getOne/{id}", method = RequestMethod.POST)
    public Response getOne(@PathVariable int id) {
        Response sysResponse = null;
        try {
            sysResponse = Response.getSuccess(customerService.getOne(id));
        } catch (Exception e) {
            logger.error("获取用户信息失败", e);
            sysResponse = Response.getError("系统暂时无法处理您的请求,请重试");
        }
        return sysResponse;
    }
    
    @RequestMapping(value = "findCustById", method = RequestMethod.POST)
    public Response findCustById(@RequestBody MyOrderReq req) {
            Map<String,Object> m = customerService.findCustById(req);
            String sphone = m.get("phone")+"";
            if(sphone != ""){
            	 sphone = SysUtils.toProSub(sphone);
                 m.put("sphone", sphone);
               logger.debug("phone>>>>"+ sphone);
            }else{
            	  m.put("sphone", "");
            }
        return Response.buildSuccess(m, "success");
    }
    
    @RequestMapping(value = "getjifen", method = RequestMethod.POST)
    public Response getjifen(@RequestBody MyOrderReq req) {
        Object m = customerService.getjifen(req);
        return Response.buildSuccess(m, "success");
    }

    /**
     * 修改用户信息
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "update", method = RequestMethod.POST)
    public Response update(@RequestBody Map<Object, Object> param) {
        Response sysResponse = null;
        try {
            customerService.update(param);
            sysResponse = Response.getSuccess();
        } catch (Exception e) {
            logger.error("修改用户信息失败", e);
            sysResponse = Response.getError("系统暂时无法处理您的请求,请重试");
        }
        return sysResponse;
    }
    
    
    @RequestMapping(value = "cust_update", method = RequestMethod.POST)
    public Response cust_update(@RequestBody Customer req) {
        logger.debug("更新用户信息:"+req);
       /* Boolean t = c.getAccountType();
        if(t.equals(c.TYPE_PHONE)){//手机注册
            String p = c.getPhone();
            Boolean b = customerService.findUsername(p,c.getId());
            if(b){
                return Response.getError("已存在此手机号，无法更新");
            }
        }else if(t.equals(c.TYPE_EMAIL)){//邮件注册
            String email = c.getEmail();
            Boolean b = customerService.findUsername(email,c.getId());
            if(b){
                return Response.getError("已存在此邮箱，无法更新");
            }
        }*/
        customerService.cust_update(req);
        return Response.buildSuccess("", "更新成功");
    }

    /**
     * 修改用户密码 web用
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "changePassword", method = RequestMethod.POST)
    public Response changePassword(@RequestBody Map<Object, Object> param) {
        Response sysResponse = null;
        try {
            int id = (int) param.get("id");
            Map<Object, Object> customer = customerService.getOne(id);
            if (customer != null) {
                String passwordInDB = (String) customer.get("password");// 获取数据库中的密码
                String pwd =   param.get("passwordOld")==null?"":param.get("passwordOld").toString();
                String pwd_new =  param.get("password")==null?"":param.get("password").toString();
                if(pwd=="" || pwd_new==""){
                    sysResponse = Response.getError("请输入密码");
                    return sysResponse;
                }
                String md5pwd = SysUtils.string2MD5(pwd);
                String md5_new_pwd = SysUtils.string2MD5(pwd_new);
                if ((md5pwd).equals(passwordInDB)) {// 判断原密码
                    param.put("password", md5_new_pwd);
                    customerService.updatePassword(param);
                    sysResponse = Response.getSuccess();
                } else {
                    sysResponse = Response.getError("修改用户密码失败:原密码不正确");
                }
            } else {
                sysResponse = Response.getError("修改用户密码失败:用户不存在");
            }
        } catch (Exception e) {
            logger.error("修改用户密码失败", e);
            sysResponse = Response.getError("系统暂时无法处理您的请求,请重试");
        }
        return sysResponse;
    }

    //手机端口修改密码
    @RequestMapping(value = "updatePassword", method = RequestMethod.POST)
    public Response updatePassword(@RequestBody Map<Object, Object> param) {
        Response sysResponse = null;
        try {
            int id = (int) param.get("id");
            Map<Object, Object> customer = customerService.getOne(id);
            if (customer != null) {
                String passwordInDB = (String) customer.get("password");// 获取数据库中的密码
                String pwd =   param.get("passwordOld")==null?"":param.get("passwordOld").toString();
                String pwd_new =  param.get("password")==null?"":param.get("password").toString();
                if(pwd=="" || pwd_new==""){
                    sysResponse = Response.getError("请输入密码");
                    return sysResponse;
                }
                if ((pwd).equalsIgnoreCase(passwordInDB)) {// 判断原密码
                    customerService.updatePassword(param);
                    sysResponse = Response.getSuccess();
                } else {
                    sysResponse = Response.getError("修改用户密码失败:原密码不正确");
                }
            } else {
                sysResponse = Response.getError("修改用户密码失败:用户不存在");
            }
        } catch (Exception e) {
            logger.error("修改用户密码失败", e);
            sysResponse = Response.getError("系统暂时无法处理您的请求,请重试");
        }
        return sysResponse;
    }
    /**
     * 获取积分列表
     * 
     * @param customerId
     */
    @RequestMapping(value = "getIntegralList/{customerId}/{page}/{rows}", method = RequestMethod.POST)
    public Response getIntegralList(@PathVariable int customerId, @PathVariable int page, @PathVariable int rows) {
        Response sysResponse = null;
        try {
            Map<Object, Object> result = new HashMap<Object, Object>();
            result.put("total", customerService.getTradeRecordsCount(customerId));
            result.put("list", customerService.getIntegralList(customerId, page, rows));
            sysResponse = Response.getSuccess(result);
        } catch (Exception e) {
            logger.error("获取积分列表失败", e);
            sysResponse = Response.getError("系统暂时无法处理您的请求,请重试");
        }
        return sysResponse;
    }

    /**
     * 获取积分总计
     * 
     * @param customerId
     */
    @RequestMapping(value = "getIntegralTotal/{customerId}", method = RequestMethod.POST)
    public Response getIntegralTotal(@PathVariable int customerId) {
        Response sysResponse = null;
        try {
            sysResponse = Response.getSuccess(customerService.getIntegralTotal(customerId));
        } catch (Exception e) {
            logger.error("获取积分总计失败", e);
            sysResponse = Response.getError("系统暂时无法处理您的请求,请重试");
        }
        return sysResponse;
    }

    /**
     * 提交积分兑换
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "insertIntegralConvert", method = RequestMethod.POST)
    public Response insertIntegralConvert(@RequestBody Map<Object, Object> param) {
        Response sysResponse = null;
        try {
        	String apply_num = String.valueOf(System.currentTimeMillis());
        	param.put("apply_num", apply_num);
            customerService.insertIntegralConvert(param);
            sysResponse = Response.getSuccess();
        } catch (Exception e) {
            logger.error("提交积分兑换失败", e);
            sysResponse = Response.getError("系统暂时无法处理您的请求,请重试");
        }
        return sysResponse;
    }

    /**
     * 获取地址列表
     * 
     * @param customerId
     */
    @RequestMapping(value = "getAddressList/{customerId}", method = RequestMethod.POST)
    public Response getAddressList(@PathVariable int customerId) {
        Response sysResponse = null;
        try {
            sysResponse = Response.getSuccess(customerService.getAddressList(customerId));
        } catch (Exception e) {
            logger.error("获取地址列表失败", e);
            sysResponse = Response.getError("系统暂时无法处理您的请求,请重试");
        }
        return sysResponse;
    }

    /**
     * 新增地址
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "insertAddress", method = RequestMethod.POST)
    public Response insertAddress(@RequestBody Map<Object, Object> param) {
        Response sysResponse = null;
        try {
        	int i = customerService.countAddress(param);
        	if(i>9){
        		sysResponse = Response.getError( "最多可以创建10个收货地址");
        		return sysResponse;
        	}
            int j = customerService.insertAddress(param);
            sysResponse = Response.buildSuccess(j, "保存成功");
            logger.debug("insertAddress>>>> id "+ j);
        } catch (Exception e) {
            logger.error("新增地址失败", e);
            sysResponse = Response.getError("系统暂时无法处理您的请求,请重试");
        }
        return sysResponse;
    }

    /**
     * 修改地址
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "updateAddress", method = RequestMethod.POST)
    public Response updateAddress(@RequestBody Map<Object, Object> param) {
        Response sysResponse = null;
//        try {
        	  Integer addressId = (Integer) param.get("id");
              if(null == addressId){
              	return Response.buildErrorWithMissing();
              }
            customerService.updateAddress(param);
            sysResponse = Response.getSuccess();
//        } catch (Exception e) {
//            logger.error("修改地址失败", e);
//            sysResponse = Response.getError("系统暂时无法处理您的请求,请重试");
//        }
        return sysResponse;
    }

    /**
     * 设置为默认地址
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "setDefaultAddress", method = RequestMethod.POST)
    public Response setDefaultAddress(@RequestBody Map<Object, Object> param) {
        Response sysResponse = null;
        try {
            customerService.setDefaultAddress(param);
            sysResponse = Response.getSuccess();
        } catch (Exception e) {
            logger.error("设置为默认地址失败", e);
            sysResponse = Response.getError("系统暂时无法处理您的请求,请重试");
        }
        return sysResponse;
    }

    /**
     * 删除地址
     * 
     * @param id
     * @return
     */
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "deleteAddress", method = RequestMethod.POST)
    public Response deleteAddress(@RequestBody Map<Object, Object> param) {
        Response sysResponse = null;
        try {
            List<Integer> ids = (ArrayList<Integer>) param.get("ids");
            for (int id : ids) {
                customerService.deleteAddress(id);
            }
            sysResponse = Response.getSuccess();
        } catch (Exception e) {
            logger.error("删除地址失败", e);
            sysResponse = Response.getError("系统暂时无法处理您的请求,请重试");
        }
        return sysResponse;
    }
    
    
	@RequestMapping(value = "getUpdateEmailDentcode", method = RequestMethod.POST)
	public Response getUpdateEmailDentcode(@RequestBody Customer param) {
		Response sysResponse = null;
		try {
			sysResponse = Response.getSuccess(customerService.getUpdateEmailDentcode(param.getId(), param.getEmail()));
		} catch (Exception e) {
			logger.error("获取 修改邮箱验证码失败", e);
			sysResponse = Response.getError("获取 修改邮箱验证码失败:请检查参数");
		}
		return sysResponse;
	}

	// 传入 用户id  新的email
	@RequestMapping(value = "updateEmail", method = RequestMethod.POST)
	public Response updateEmail(@RequestBody Customer param) {
		Response sysResponse = null;
		try {
			Customer customer = customerService.getCustomerById(param);
			if (customer != null) {
				if (customer.getDentcode().equals(param.getDentcode())) {// 判断验证码
					customer.setEmail(param.getEmail());
					customerService.cust_update(customer);
					sysResponse = Response.getSuccess();
				} else {
					sysResponse = Response.getError("修改邮箱失败:验证码不正确");
				}
			} else {
				sysResponse = Response.getError("修改邮箱失败:用户不存在");
			}
		} catch (Exception e) {
			logger.error("修改邮箱失败", e);
			sysResponse = Response.getError("修改邮箱失败:请检查参数是否正确");
		}
		return sysResponse;
	}
	
	@RequestMapping(value="sendDeviceCode",method=RequestMethod.POST)
    public Response sendDeviceCode(@RequestBody Customer param){
    	int code = messageReceiverService.upCustomerDevice(param.getId(), param.getDeviceCode());
    	if(code==1){
    		return Response.getSuccess();
    	}else{
    		return Response.getError("保存推送通道ID出错");
    	}
    	
    }


}