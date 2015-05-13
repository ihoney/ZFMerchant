package com.comdosoft.financial.user.mapper.zhangfu;

import java.util.List;
import java.util.Map;

import com.comdosoft.financial.user.domain.query.Cart;
import com.comdosoft.financial.user.domain.query.CartReq;




public interface ShopCartMapper {



    void delete(int cartId);

    void add(CartReq cartreq);

    void update(CartReq cartreq);

    int isExist(CartReq cartreq);

    List<Map<String,Object>> getList(CartReq cartreq);

    int getTotal(CartReq cartreq);

    void update2(CartReq cartreq);

    Map<String, Object> getShopOne(CartReq cartreq);

    Map<String, Object> getLeaseOne(CartReq cartreq);

    Map<String, Object> getShopOne2(Cart c);

    
    
}