package com.comdosoft.financial.user.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.query.CartReq;
import com.comdosoft.financial.user.mapper.zhangfu.GoodMapper;
import com.comdosoft.financial.user.mapper.zhangfu.ShopCartMapper;

@Service
public class MakeOrderService {

    @Autowired
    private ShopCartMapper shopCartMapper;
    @Autowired
    private GoodMapper goodMapper;
    
    @Value("${filePath}")
    private String filePath;
    

    public Map<String, Object> getShop(CartReq cartreq) {
        Map<String, Object> map=null;
        if(2==cartreq.getType()){
            map=shopCartMapper.getLeaseOne(cartreq);
        }else{
            map=shopCartMapper.getShopOne(cartreq);
        }
        if(map==null){
            return null;
        }
        int goodId =Integer.valueOf(""+map.get("goodId")); 
        //图片
        List<String> goodPics=goodMapper.getgoodPics(goodId);
        if(null!=goodPics&&goodPics.size()>0){
            map.put("url_path",filePath+goodPics.get(0));
        }
        return map;
    }

    
}
