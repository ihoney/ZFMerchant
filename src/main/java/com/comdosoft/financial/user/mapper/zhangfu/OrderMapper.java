package com.comdosoft.financial.user.mapper.zhangfu;

import java.util.List;
import java.util.Map;

import com.comdosoft.financial.user.domain.query.OrderReq;
import com.comdosoft.financial.user.domain.zhangfu.CommentsJson;
import com.comdosoft.financial.user.domain.zhangfu.GoodsPicture;
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.domain.zhangfu.Order;
import com.comdosoft.financial.user.domain.zhangfu.Terminal;

public interface OrderMapper {

    void addOrder(OrderReq orderreq);

    List<Map<String, Object>> getGoodInfos(OrderReq orderreq);

    void addOrderGood(OrderReq orderreq);

    Map<String, Object> getGoodInfo(OrderReq orderreq);
    
    List<Map<String, Object>> checkList(OrderReq orderreq);
    
    Map<String, Object> getPayOrder(OrderReq orderreq);

    List<Map<String, Object>> getPayOrderGood(OrderReq orderreq);
    
    void payFinish(OrderReq orderreq);
    
    Map<String, Object> getOrderByMumber(OrderReq orderreq);
    
    void upOrder(OrderReq orderreq);

// ----gch start --------------
    int countMyOrder(MyOrderReq myOrderReq);

    List<Order> findMyOrderAll(MyOrderReq myOrderReq);

    Order findMyOrderById(Integer id);

    int changeStatus(MyOrderReq myOrderReq);

    void comment(MyOrderReq myOrderReq);

    List<GoodsPicture> findPicByGoodId(Integer gid);

    List<Map<String, Object>> findTraceById(MyOrderReq myOrderReq);

    int countOrderSearch(MyOrderReq myOrderReq);

    List<Order> orderSearch(MyOrderReq myOrderReq);

    List<Terminal> getTerminsla(Integer order_id,Integer goods_id);

    int  batchSaveComment(List<CommentsJson> list);

    void cleanOrder();

    List<Map<String, Object>>  findPersonGoodsQuantity();

    void update_goods_stock(String good_id, String quantity);

// ------gch end ---------------------
}
