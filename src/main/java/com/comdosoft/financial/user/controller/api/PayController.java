package com.comdosoft.financial.user.controller.api;


import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.OrderReq;
import com.comdosoft.financial.user.service.CsRepairService;
import com.comdosoft.financial.user.service.OrderService;



@RestController
@RequestMapping(value = "/api/pay")
public class PayController {
    
    @Resource
    private OrderService orderService;
    @Resource
    private CsRepairService csRepairService;
    
    @RequestMapping(value = "alipayback", method = RequestMethod.POST)
    public void payOrder(@RequestParam("ordernumber") String ordernumber) {
        OrderReq orderreq=new OrderReq();
        orderreq.setOrdernumber(ordernumber);
        orderService.payFinish(orderreq);
    }
    
    @RequestMapping(value = "repair_alipayback", method = RequestMethod.POST)
    public Response repair_alipayback(@RequestParam("ordernumber") String ordernumber) {// apply_num  维修编号
    	int i = csRepairService.repairSuccess(ordernumber);
    	if(i==1){
    		return Response.getSuccess();
    	}else{
    		return Response.getError("付款失败");
    	}
    }
}
