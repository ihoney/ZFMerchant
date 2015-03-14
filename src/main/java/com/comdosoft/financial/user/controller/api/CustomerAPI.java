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
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.service.CustomerService;

/**
 * 我的信息<br>
 * <功能描述>
 *
 * @author zengguang 2015年2月7日
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
    @RequestMapping(value = "getOne/{id}", method = RequestMethod.POST)
    public Response getOne(@PathVariable int id) {
        Response sysResponse = null;
        try {
            sysResponse = Response.getSuccess(customerService.getOne(id));
        } catch (Exception e) {
            logger.error("获取用户信息失败", e);
            sysResponse = Response.getError("获取用户信息失败:系统异常");
        }
        return sysResponse;
    }
    
    @RequestMapping(value = "findCustById", method = RequestMethod.POST)
    public Response findCustById(@RequestBody MyOrderReq req) {
            Map<String,Object> m = customerService.findCustById(req);
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
            sysResponse = Response.getError("修改用户信息失败:系统异常");
        }
        return sysResponse;
    }

    /**
     * 修改用户密码
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "updatePassword", method = RequestMethod.POST)
    public Response updatePassword(@RequestBody Map<Object, Object> param) {
        Response sysResponse = null;
        try {
            int id = (int) param.get("id");
            Map<Object, Object> customer = customerService.getOne(id);
            if (customer != null) {
                String passwordInDB = (String) customer.get("password");// 获取数据库中的密码
                if (((String) param.get("passwordOld")).equals(passwordInDB)) {// 判断原密码
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
            sysResponse = Response.getError("修改用户密码失败:系统异常");
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
            sysResponse = Response.getError("获取积分列表失败:系统异常");
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
            sysResponse = Response.getError("获取积分总计失败:系统异常");
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
            customerService.insertIntegralConvert(param);
            sysResponse = Response.getSuccess();
        } catch (Exception e) {
            logger.error("提交积分兑换失败", e);
            sysResponse = Response.getError("提交积分兑换失败:系统异常");
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
            sysResponse = Response.getError("获取地址列表失败:系统异常");
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
            customerService.insertAddress(param);
            sysResponse = Response.getSuccess();
        } catch (Exception e) {
            logger.error("新增地址失败", e);
            sysResponse = Response.getError("新增地址失败:系统异常");
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
        try {
            customerService.updateAddress(param);
            sysResponse = Response.getSuccess();
        } catch (Exception e) {
            logger.error("修改地址失败", e);
            sysResponse = Response.getError("修改地址失败:系统异常");
        }
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
            sysResponse = Response.getError("设置为默认地址失败:系统异常");
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
            sysResponse = Response.getError("删除地址失败:系统异常");
        }
        return sysResponse;
    }

}