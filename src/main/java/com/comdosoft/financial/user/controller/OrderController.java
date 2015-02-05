package com.comdosoft.financial.user.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.OrderReq;
import com.comdosoft.financial.user.service.OrderService;

@Controller
@RequestMapping("order")
public class OrderController {

    @Autowired
    private OrderService orderService ;
    
    
    @RequestMapping(value = "cart", method = RequestMethod.POST)
    @ResponseBody
    public Response createOrderFromCart(@RequestBody OrderReq orderreq){
        Response resp=new Response();
        resp.setResult(Response.ERROR_CODE);
        if(null!=orderreq.getCartid()&&orderreq.getCartid().length>0){
            int result= orderService.createOrderFromCart(orderreq);
            if(result==1){
                resp.setResult(Response.SUCCESS_CODE);
            }
        }
        return resp;
    }
    
    @RequestMapping(value = "shop", method = RequestMethod.POST)
    @ResponseBody
    public Response createOrderFromShop(@RequestBody OrderReq orderreq){
        Response resp=new Response();
        int result= orderService.createOrderFromShop(orderreq);
        if(result==1){
            resp.setResult(Response.SUCCESS_CODE);
        }else{
            resp.setResult(Response.ERROR_CODE);
        }
        return resp;
    }
}
