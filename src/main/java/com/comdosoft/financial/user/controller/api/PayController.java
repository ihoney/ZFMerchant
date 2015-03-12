package com.comdosoft.financial.user.controller.api;


import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.query.OrderReq;
import com.comdosoft.financial.user.service.OrderService;



@RestController
@RequestMapping(value = "/api/pay")
public class PayController {
    
    @Resource
    private OrderService orderService;
    
    @RequestMapping(value = "alipayback", method = RequestMethod.POST)
    public void payOrder(@RequestParam("ordernumber") String ordernumber) {
        OrderReq orderreq=new OrderReq();
        orderreq.setOrdernumber(ordernumber);
        orderService.payFinish(orderreq);
    }
    
    @RequestMapping(value = "repair_alipayback", method = RequestMethod.POST)
    public void repair_alipayback(@RequestParam("ordernumber") String ordernumber) {
        System.err.println("test repair pay.....");
    }
}
