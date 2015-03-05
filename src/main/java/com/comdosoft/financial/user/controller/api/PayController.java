package com.comdosoft.financial.user.controller.api;


import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.query.OrderReq;
import com.comdosoft.financial.user.service.OrderService;



@RestController
@RequestMapping(value = "/api/pay")
public class PayController {
    
    @Resource
    private OrderService orderService;
    
    @RequestMapping(value = "alipayback", method = RequestMethod.POST)
    public void payOrder(@RequestBody OrderReq orderreq) {
        orderService.payFinish(orderreq);
    }
}
