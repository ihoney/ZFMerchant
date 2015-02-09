package com.comdosoft.financial.user.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.mapper.zhangfu.CustomerMapper;

/**
 * 用户 - 业务层<br>
 *
 * @author Java-007 2015年2月7日
 *
 */
@Service
public class CustomerService {

    @Resource
    private CustomerMapper customerMapper;

    public Map<Object, Object> getSysConfig(String paramName) {
        return customerMapper.getSysConfig(paramName);
    }

    public Map<Object, Object> getOne(int id) {
        return customerMapper.getOne(id);
    }

    public void update(Map<Object, Object> param) {
        customerMapper.update(param);
    }

    public void updatePassword(Map<Object, Object> param) {
        customerMapper.updatePassword(param);
    }

    public List<Map<Object, Object>> getIntegralList(int customerId) {
        return customerMapper.getIntegralList(customerId);
    }

    public Map<Object, Object> getIntegralTotal(int customerId) {
        return customerMapper.getIntegralTotal(customerId);
    }

    public void insertIntegralConvert(Map<Object, Object> param) {

        customerMapper.insertIntegralConvert(param);
    }

    public void insertIntegralRecord(Map<Object, Object> param) {

        customerMapper.insertIntegralRecord(param);
    }

    public List<Map<Object, Object>> getAddressList(int customerId) {
        return customerMapper.getAddressList(customerId);
    }

    public Map<Object, Object> getOneAddress(int id) {
        return customerMapper.getOneAddress(id);
    }

    public void insertAddress(Map<Object, Object> param) {
        customerMapper.insertAddress(param);
    }

    public void deleteAddress(int id) {
        customerMapper.deleteAddress(id);
    }

}