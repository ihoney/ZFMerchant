package com.comdosoft.financial.user.controller.api;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.MyOrderReq;
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
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
    @Resource
    private OrderService orderService;
    
    //  gch  begin
    //订单列表
    @RequestMapping(value="getMyOrderAll" ,method=RequestMethod.POST)
    public Response getMyOrderAll(@RequestBody MyOrderReq myOrderReq) {
        try{
            logger.debug("获取我的订单列表 start");
            Page<Object> centers = orderService.findMyOrderAll(myOrderReq.getPage(), myOrderReq.getPageSize(),myOrderReq.getCustomers_id());
            logger.debug("获取我的订单列表 end"+centers);
            return Response.getSuccess(centers);
        }catch(Exception e){
            logger.debug("获取我的订单列表出错"+e);
            return Response.getError("请求失败");
        }
    }
    
    @RequestMapping(value="getMyOrderById" ,method=RequestMethod.POST)
    public Response getMyOrderById(@RequestParam(value = "id", required = false) String id ) {
        try{
            logger.debug("获取我的订单详情 start");
            Object centers = orderService.findMyOrderById(id);
            logger.debug("获取我的订单详情 end"+centers);
            return Response.getSuccess(centers);
        }catch(Exception e){
            logger.debug("获取我的订单详情出错"+e);
            return Response.getError("请求失败");
        }
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
