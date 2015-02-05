package com.comdosoft.financial.user.mapper.zhangfu;

import com.comdosoft.financial.user.domain.query.PosReq;

import java.util.List;
import java.util.Map;


public interface GoodMapper {



    List<Map<String, Object>> getGoodsList(PosReq posreq);

    List<Map<String, String>> getPayChannelListByGoodId(int id);

    List<Map<String, String>> getgoodPics(int id);

    int getCommentCount(int id);
    
    
}