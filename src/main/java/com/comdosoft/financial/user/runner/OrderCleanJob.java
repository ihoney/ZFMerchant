package com.comdosoft.financial.user.runner;

import javax.annotation.Resource;

import com.comdosoft.financial.user.service.OrderService;
 
public class OrderCleanJob {
 
    @Resource
    private OrderService orderService;
    
    public void doClean() {
        orderService.cleanOrder();
    }
}