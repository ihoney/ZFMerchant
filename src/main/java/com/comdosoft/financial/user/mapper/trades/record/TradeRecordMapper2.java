package com.comdosoft.financial.user.mapper.trades.record;

import java.util.List;
import java.util.Map;

import com.comdosoft.financial.user.domain.query.TradeReq;

/**
 * Dao层接口
 * 
 * @author zengguang
 * 
 */
public interface TradeRecordMapper2 {

    Map<String, Object> getTradeRecordsCount12(TradeReq req);

    Map<String, Object> getTradeRecordsCount3(TradeReq req);
    
    Map<String, Object> getTradeRecordsCount4(TradeReq req);
    
    Map<String, Object> getTradeRecordsCount5(TradeReq req);

    List<Map<Object, Object>> getTradeRecords12(TradeReq req);
    
    List<Map<Object, Object>> getTradeRecords3(TradeReq req);
    
    List<Map<Object, Object>> getTradeRecords4(TradeReq req);
    
    List<Map<Object, Object>> getTradeRecords5(TradeReq req);

    

}