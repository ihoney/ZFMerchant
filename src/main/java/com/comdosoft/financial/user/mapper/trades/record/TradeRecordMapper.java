package com.comdosoft.financial.user.mapper.trades.record;

import java.util.List;
import java.util.Map;

/**
 * Dao层接口
 * 
 * @author zengguang
 * 
 */
public interface TradeRecordMapper {

    List<Map<Object, Object>> getTerminals(int customerId);

    List<Map<Object, Object>> getTradeRecords(Map<Object, Object> query);

    Map<Object, Object> getTradeRecordTotal(Map<Object, Object> query);

}