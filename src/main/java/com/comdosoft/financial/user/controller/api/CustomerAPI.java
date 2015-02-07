package com.comdosoft.financial.user.controller.api;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.service.CustomerService;

/**
 * 
 * 我的信息<br>
 * <功能描述>
 *
 * @author xfh 2015年2月7日
 *
 */
@RestController
@RequestMapping(value = "api/customers")
public class CustomerAPI {

    @Resource
    private CustomerService customerService;

    /**
     * 日志记录器
     */
    private static final Logger logger = Logger.getLogger(CustomerAPI.class);

    /**
     * 获取用户信息
     * 
     * @param id
     */
    @RequestMapping(value = "getCustomer/{id}", method = RequestMethod.GET)
    public Response getCustomer(@PathVariable int id) {
        Response sysResponse = null;
        try {
            sysResponse = Response.getSuccess(customerService.getOne(id));
        } catch (Exception e) {
            logger.error("获取用户信息失败", e);
            sysResponse = Response.getError("获取用户信息失败:系统异常");
        }
        return sysResponse;
    }

    /**
     * 修改用户密码
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "updateCustomerPassword", method = RequestMethod.POST)
    public Response updateCustomerPassword(@RequestBody Map<Object, Object> param) {
        Response sysResponse = null;
        try {

            // 判断原密码

            // 加密新密码

            customerService.updatePassword(param);
            sysResponse = Response.getSuccess();
        } catch (Exception e) {
            logger.error("修改用户密码失败", e);
            sysResponse = Response.getError("修改用户密码失败:系统异常");
        }
        return sysResponse;
    }

}
