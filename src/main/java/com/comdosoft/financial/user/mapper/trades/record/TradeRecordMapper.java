package com.comdosoft.financial.user.mapper.trades.record;

import java.util.List;
import java.util.Map;

import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;

/**
 * Dao层接口
 * 
 * @author zengguang
 * 
 */
public interface TradeRecordMapper {

    List<Map<Object, Object>> getTradeRecords12(Map<Object, Object> query);

    Map<Object, Object> getTradeRecord12(int tradeRecordId);

    List<Map<Object, Object>> getTradeRecords3(Map<Object, Object> query);

    Map<Object, Object> getTradeRecord3(int tradeRecordId);

    List<Map<Object, Object>> getTradeRecords4(Map<Object, Object> query);

    Map<Object, Object> getTradeRecord4(int tradeRecordId);

    List<Map<Object, Object>> getTradeRecords5(Map<Object, Object> query);

    Map<Object, Object> getTradeRecord5(int tradeRecordId);

    Map<Object, Object> getTradeRecordTotal(Map<Object, Object> query);

    List<Map<String, Object>> getSevenDynamic(MyOrderReq myOrderReq);

    int getTradeRecordsCount12(Map<Object, Object> query);

    int getTradeRecordsCount3(Map<Object, Object> query);

    int getTradeRecordsCount4(Map<Object, Object> query);

    int getTradeRecordsCount5(Map<Object, Object> query);

}