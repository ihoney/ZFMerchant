package com.comdosoft.financial.user.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.zhangfu.Order;
import com.comdosoft.financial.user.domain.zhangfu.OrderGood;
import com.comdosoft.financial.user.mapper.zhangfu.OrderMapper;
import com.comdosoft.financial.user.utils.page.Page;
import com.comdosoft.financial.user.utils.page.PageRequest;

@Service
public class OrderService {
    @Resource
    private OrderMapper orderMapper;

    public Page<Object> findAll(Integer page,Integer pageSize,String pid) {
        PageRequest request = new PageRequest(page, pageSize);
        int count = orderMapper.count(pid);
        List<Order> centers = orderMapper.findAll(request,pid);
        List<Object> obj_list = new ArrayList<Object>();
        Map<String,Object> map = null;
        for(Order o : centers){
            map = new HashMap<String, Object>();
            map.put("order_id", o.getId().toString());
            map.put("order_number", o.getOrderNumber());
            map.put("order_createTime", o.getCreatedAt());
            map.put("order_pay_status", o.getPayStatus());
            map.put("order_totalNum", o.getTotalQuantity() == null ? "" : o.getTotalQuantity().toString());// 订单总件数
            map.put("order_totalPrice", o.getActualPrice());
            map.put("order_psf", "");//配送费
            List<OrderGood> olist = o.getOrderGoodsList();
            List<Object> newObjList = new ArrayList<Object>();
            Map<String, Object> omap = null;
            if (olist.size() > 0) {
                for (OrderGood od : olist) {
                    omap = new HashMap<String, Object>();
                    omap.put("good_id", od.getGood() == null ? "" : od.getGood().getId().toString());
                    omap.put("good_price", od.getPrice() == null ? "" : od.getPrice().toString());
                    omap.put("good_num", od.getQuantity() == null ? "" : od.getQuantity().toString());
                    omap.put("good_name", od.getGood() == null ? "" : od.getGood().getTitle());
                    omap.put("good_brand", od.getGood() == null ? "" : od.getGood().getGoodsBrand() == null ? "" : od.getGood().getGoodsBrand().getName());
                    omap.put("good_channel", od.getPayChannel() == null ? "" : od.getPayChannel().getName());
                    newObjList.add(omap);
                }
            }
            map.put("order_goodsList", newObjList);
            obj_list.add(map);
        }
        return new Page<Object>(request, obj_list, count);
    }
    

}
