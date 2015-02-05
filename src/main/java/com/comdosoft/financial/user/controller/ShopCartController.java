package com.comdosoft.financial.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.CartReq;

import com.comdosoft.financial.user.service.ShopCartService;

@Controller
@RequestMapping("Cart")
public class ShopCartController {

    @Autowired
    private ShopCartService shopCartService ;
    
    @RequestMapping(value = "list", method = RequestMethod.POST)
    @ResponseBody
    public Response getList(@RequestBody CartReq cartreq){
        Response resp=new Response();
        List<?> cartList=shopCartService.getList(cartreq);
        resp.setResult(Response.SUCCESS_CODE);
        resp.setResult(cartList);
        return resp;
    }
    
    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseBody
    public Response delete(@RequestBody CartReq cartreq){
        Response resp=new Response();
        int result= shopCartService.delete(cartreq.getId());
        if(result==1){
            resp.setResult(Response.SUCCESS_CODE);
        }else{
            resp.setResult(Response.ERROR_CODE);
        }
        return resp;
    }
    
    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseBody
    public Response add(@RequestBody CartReq cartreq){
        Response resp=new Response();
        resp.setResult(Response.SUCCESS_CODE);
        int result= shopCartService.add(cartreq);
        if(result==1){
            resp.setResult(Response.SUCCESS_CODE);
        }else{
            resp.setResult(Response.ERROR_CODE);
        }
        return resp;
    }
   
    @RequestMapping(value = "update", method = RequestMethod.POST)
    @ResponseBody
    public Response update(@RequestBody CartReq cartreq){
        Response resp=new Response();
        resp.setResult(Response.SUCCESS_CODE);
        int result= shopCartService.update(cartreq);
        if(result==1){
            resp.setResult(Response.SUCCESS_CODE);
        }else{
            resp.setResult(Response.ERROR_CODE);
        }
        return resp;
    }
}
