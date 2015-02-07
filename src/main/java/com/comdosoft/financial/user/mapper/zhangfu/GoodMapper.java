package com.comdosoft.financial.user.mapper.zhangfu;

import com.comdosoft.financial.user.domain.query.PosReq;

import java.util.List;
import java.util.Map;


public interface GoodMapper {



    List<Map<String, Object>> getGoodsList(PosReq posreq);

    List<Map<String, String>> getPayChannelListByGoodId(PosReq posreq);

    List<Map<String, String>> getgoodPics(int id);

    int getCommentCount(int id);

    
    
    
    
    
    List<Map<String, Object>> getBrands_ids();

    List<Map<String, Object>> getFartherCategorys();
    
    List<Map<String, Object>> getSonCategorys(int id);

    List<Map<String, Object>> getPay_channel_ids(PosReq posreq);

    List<Map<String, Object>> getPay_card_ids();

    List<Map<String, Object>> getTrade_type_ids(PosReq posreq);

    List<Map<String, Object>> getSale_slip_ids();

    List<Map<String, Object>> getTDates(PosReq posreq);

}