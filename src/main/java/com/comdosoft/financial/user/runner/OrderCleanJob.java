package com.comdosoft.financial.user.runner;

import java.util.Date;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.comdosoft.financial.user.service.OrderService;
 
public class OrderCleanJob {
	private static final Logger logger  = LoggerFactory.getLogger(OrderCleanJob.class);
    @Resource
    private OrderService orderService;
    
    @SuppressWarnings("deprecation")
	public void doClean() {
    	logger.error("开始运行订单清理..."+new Date().toLocaleString());
        orderService.cleanOrder();
    }
}