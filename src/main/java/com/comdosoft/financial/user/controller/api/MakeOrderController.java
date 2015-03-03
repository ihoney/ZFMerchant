package com.comdosoft.financial.user.controller.api;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.CartReq;
import com.comdosoft.financial.user.service.MakeOrderService;

@RestController
@RequestMapping("api/makeorder")
public class MakeOrderController {

    @Autowired
    private MakeOrderService makeOrderService ;
    
    @RequestMapping(value = "shop", method = RequestMethod.POST)
    public Response getShopOne(@RequestBody CartReq cartreq){
        Response resp=new Response();
        Map<String,Object> map=makeOrderService.getShop(cartreq);
        if(map==null){
            resp.setCode(Response.ERROR_CODE);
        }else{
            resp.setCode(Response.SUCCESS_CODE);
            resp.setResult(map);
        }
        return resp;
    }
    
}
