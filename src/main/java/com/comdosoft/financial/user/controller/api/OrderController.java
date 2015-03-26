package com.comdosoft.financial.user.controller.api;

import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.OrderReq;
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.service.OrderService;
import com.comdosoft.financial.user.utils.Exception.LowstocksException;
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
@RequestMapping(value = "/api/order")
public class OrderController {
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
    @Resource
    private OrderService orderService;

    // gch begin
    // 订单列表
    @RequestMapping(value = "getMyOrderAll", method = RequestMethod.POST)
    public Response getMyOrderAll(@RequestBody MyOrderReq myOrderReq) {
        try {
            Page<Object> centers = orderService.findMyOrderAll(myOrderReq);
            return Response.getSuccess(centers);
        } catch (NullPointerException e) {
            return Response.buildErrorWithMissing();
        } catch (Exception e) {
            logger.debug("获取我的订单列表出错" + e);
            return Response.getError("请求失败");
        }
    }

    // 订单搜索筛选
    @RequestMapping(value = "orderSearch", method = RequestMethod.POST)
    public Response orderSearch(@RequestBody MyOrderReq myOrderReq) {
//        try {
            Page<Object> centers = orderService.orderSearch(myOrderReq);
            return Response.getSuccess(centers);
//        } catch (NullPointerException e) {
//            return Response.buildErrorWithMissing();
//        } catch (Exception e) {
//            logger.debug("获取我的订单列表出错" + e);
//            return Response.getError("请求失败");
//        }
    }

    @RequestMapping(value = "getMyOrderById", method = RequestMethod.POST)
    public Response getMyOrderById(@RequestBody MyOrderReq myOrderReq) {
        try {
        	  Object centers = null;
        	  String q = myOrderReq.getQ();
        	if(null != q && q.equals("1")){
        		Map<String, Object> m =  orderService.findMyOrderById2(myOrderReq.getId());
        		 return Response.buildSuccess(m, "success");
        	}else{
        		centers = orderService.findMyOrderById(myOrderReq.getId());
        	}
            return Response.buildSuccess(centers, "success");
        } catch (NullPointerException e) {
            e.printStackTrace();
            return Response.buildErrorWithMissing();
        } catch (Exception e) {
            e.printStackTrace();
            logger.debug("获取我的订单详情出错" + e);
            return Response.getError("请求失败");
        }
    }

    @RequestMapping(value = "cancelMyOrder", method = RequestMethod.POST)
    public Response cancelMyOrder(@RequestBody MyOrderReq myOrderReq) {
        try {
            orderService.cancelMyOrder(myOrderReq);
            return Response.buildSuccess(null, "取消成功");
        } catch (Exception e) {
            logger.debug("取消我的订单详情出错" + e);
            return Response.getError("取消失败");
        }
    }

    @RequestMapping(value = "saveComment", method = RequestMethod.POST)
    public Response comment(@RequestBody MyOrderReq myOrderReq) {
        try {
            orderService.comment(myOrderReq);
            return Response.buildSuccess(null, "评论成功");
        } catch (Exception e) {
            return Response.getError("评论失败");
        }
    }
    
    @RequestMapping(value = "batchSaveComment", method = RequestMethod.POST)
    public Response batchSaveComment(@RequestBody MyOrderReq myOrderReq) {
            orderService.batchSaveComment(myOrderReq);
            return Response.buildSuccess(null, "评论成功");
    }

    // gch end

    @RequestMapping(value = "cart", method = RequestMethod.POST)
    public Response createOrderFromCart(@RequestBody OrderReq orderreq) {
        Response resp = new Response();
        resp.setCode(Response.ERROR_CODE);
        if (null != orderreq.getCartid() && orderreq.getCartid().length > 0) {
            try {
                int result = orderService.createOrderFromCart(orderreq);
                if(-3==result){
                    resp.setCode(-3);
                    resp.setMessage("购物车不存在");
                }else{
                    resp.setCode(Response.SUCCESS_CODE);
                    resp.setResult(result); 
                }
                
            } catch (LowstocksException e) {
                resp.setCode(-2);
                resp.setMessage("库存不足");
            } catch (Exception e) {
                resp.setCode(Response.ERROR_CODE);
                resp.setMessage("系统出错");
                e.printStackTrace();
            }
        }
        return resp;
    }

    @RequestMapping(value = "shop", method = RequestMethod.POST)
    public Response createOrderFromShop(@RequestBody OrderReq orderreq) {
        Response resp = new Response();
        try {
            int result = orderService.createOrderFromShop(orderreq);
            resp.setCode(Response.SUCCESS_CODE);
            resp.setResult(result);
        } catch (LowstocksException e) {
            resp.setCode(-2);
            resp.setMessage("库存不足");
        } catch (Exception e) {
            resp.setCode(Response.ERROR_CODE);
            resp.setMessage("系统出错");
            e.printStackTrace();
        }
        return resp;
    }

    @RequestMapping(value = "lease", method = RequestMethod.POST)
    public Response createOrderFromLease(@RequestBody OrderReq orderreq) {
        Response resp = new Response();
        try {
            int result = orderService.createOrderFromLease(orderreq);
            resp.setCode(Response.SUCCESS_CODE);
            resp.setResult(result);
        } catch (LowstocksException e) {
            resp.setCode(-2);
            resp.setMessage("库存不足");
        } catch (Exception e) {
            resp.setCode(Response.ERROR_CODE);
            resp.setMessage("系统出错");
            e.printStackTrace();
        }
        return resp;
    }
    
    @RequestMapping(value = "payOrder", method = RequestMethod.POST)
    public Response payOrder(@RequestBody OrderReq orderreq) {
        Response resp = new Response();
        try {
            Map<String,Object> result = orderService.payOrder(orderreq);
            resp.setCode(Response.SUCCESS_CODE);
            resp.setResult(result);
        }catch (Exception e) {
            resp.setCode(Response.ERROR_CODE);
            resp.setMessage("系统出错");
            e.printStackTrace();
        }
        return resp;
    }
}
