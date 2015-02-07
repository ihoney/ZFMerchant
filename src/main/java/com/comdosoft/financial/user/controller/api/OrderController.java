package com.comdosoft.financial.user.controller.api;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.OrderReq;
import com.comdosoft.financial.user.service.OrderService;
import com.comdosoft.financial.user.utils.page.Page;

/**
 * 
 * 订单服务<br>
 * <功能描述>
 *
 * @author gch 2015年2月4日
 *
 */
@RestController
@RequestMapping(value="/api/order")
public class OrderController {
    @Resource
    private OrderService orderService;
    
    //  gch  begin
    //订单列表
    @RequestMapping(value="getMyOrderAll" ,method=RequestMethod.POST)
    public Response getMyOrderAll(@RequestParam(value = "page", required = false) String page,
                            @RequestParam(value = "pageSize", required = false) String pageSize,
                            @RequestParam(value = "customers_id", required = false) String customers_id) {
        Response response = new Response();
        if (null == page)
            page = "1";
        if (null == pageSize)
            pageSize = "10";
        Page<Object> centers = orderService.findMyOrderAll(Integer.parseInt(page), Integer.parseInt(pageSize),customers_id);
        response.setCode(0);
        response.setResult(centers);
        return response;
    }
    
    @RequestMapping(value="getMyOrderById" ,method=RequestMethod.POST)
    public Response getMyOrderById(@RequestParam(value = "id", required = false) String id ) {
        Response response = new Response();
        Object centers = orderService.findMyOrderById(id);
        response.setCode(0);
        response.setResult(centers);
        return response;
    }
    
   //  gch  end
  
    
    @RequestMapping(value = "cart", method = RequestMethod.POST)
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
