package com.comdosoft.financial.user.service;

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

    public Map<Object, Object> getOne(int id) {
        return customerMapper.getOne(id);
    }

    public void updatePassword(Map<Object, Object> param) {
        customerMapper.updatePassword(param);
    }

}