package com.comdosoft.financial.user.mapper.zhangfu;

import java.util.List;
import java.util.Map;

import com.comdosoft.financial.user.domain.query.OrderReq;
import com.comdosoft.financial.user.domain.zhangfu.GoodsPicture;
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.domain.zhangfu.Order;

public interface OrderMapper {

    void addOrder(OrderReq orderreq);

    List<Map<String, Object>> getGoodInfos(OrderReq orderreq);

    void addOrderGood(OrderReq orderreq);

    Map<String, Object> getGoodInfo(OrderReq orderreq);

// ----gch start --------------
    int countMyOrder(Integer pid);

    List<Order> findMyOrderAll(MyOrderReq myOrderReq);

    Order findMyOrderById(Integer id);

    void cancelMyOrder(MyOrderReq myOrderReq);
// ------gch end ---------------------

    void comment(MyOrderReq myOrderReq);

    List<GoodsPicture> findPicByGoodId(Integer gid);

    List<Map<String, Object>> findTraceById(MyOrderReq myOrderReq);
}
