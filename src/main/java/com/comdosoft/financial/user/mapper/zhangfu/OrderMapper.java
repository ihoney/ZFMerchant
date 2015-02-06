package com.comdosoft.financial.user.mapper.zhangfu;

import java.util.List;
import java.util.Map;

import com.comdosoft.financial.user.domain.query.OrderReq;
import com.comdosoft.financial.user.domain.zhangfu.Order;
import com.comdosoft.financial.user.utils.page.PageRequest;

public interface OrderMapper {

    void addOrder(OrderReq orderreq);

    List<Map<String, Object>> getGoodInfos(OrderReq orderreq);

    void addOrderGood(OrderReq orderreq);

    Map<String, Object> getGoodInfo(OrderReq orderreq);


    int countMyOrder(String pid);

    List<Order> findMyOrderAll(PageRequest request, String pid);

    Order findMyOrderById(String id);

}
