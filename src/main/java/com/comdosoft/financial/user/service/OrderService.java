package com.comdosoft.financial.user.service;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.comdosoft.financial.user.domain.query.OrderReq;
import com.comdosoft.financial.user.mapper.zhangfu.OrderMapper;
import com.comdosoft.financial.user.utils.SysUtils;

@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;
    
    
    @Transactional
    public int createOrderFromCart(OrderReq orderreq) {
        try {
            orderreq.setCartids(SysUtils.Arry2Str(orderreq.getCartid()));
            int totalprice=0;
            List<Map<String,Object>> goodMapList=orderMapper.getGoodInfos(orderreq);
            for (Map<String, Object> map : goodMapList) {
                map.get("retail_price");
                map.get("quantity");
                map.get("opening_cost");
                int retail_price=SysUtils.String2int(""+map.get("retail_price"));
                int quantity=SysUtils.String2int(""+map.get("quantity"));
                int opening_cost=SysUtils.String2int(""+map.get("opening_cost"));
                totalprice+=(retail_price+opening_cost)*quantity;
            }
            orderreq.setTotalprice(totalprice);
            orderreq.setOrdernumber(SysUtils.getOrderNum(0));
            orderMapper.addOrder(orderreq);
            for (Map<String, Object> map : goodMapList) {
                map.get("opening_cost");
                map.get("opening_cost");
                map.get("opening_cost");
                orderMapper.addOrderGood(orderreq);
            }
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    
    @Transactional
    public int createOrderFromShop(OrderReq orderreq) {
        try {
            Map<String,Object> goodMap=orderMapper.getGoodInfo(orderreq);
            goodMap.get("retail_price");
            goodMap.get("quantity");
            goodMap.get("opening_cost");
            int retail_price=SysUtils.String2int(""+goodMap.get("retail_price"));
            int quantity=SysUtils.String2int(""+goodMap.get("quantity"));
            int opening_cost=SysUtils.String2int(""+goodMap.get("opening_cost"));
            int totalprice=(retail_price+opening_cost)*quantity;
            orderreq.setTotalprice(totalprice);
            orderreq.setOrdernumber(SysUtils.getOrderNum(0));
            orderMapper.addOrder(orderreq);
            orderMapper.addOrderGood(orderreq);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    
   

}
