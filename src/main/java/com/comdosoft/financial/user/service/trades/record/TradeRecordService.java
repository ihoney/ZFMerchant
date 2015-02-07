package com.comdosoft.financial.user.service.trades.record;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.Paging;
import com.comdosoft.financial.user.mapper.trades.record.TradeRecordMapper;

/**
 * 业务层实现类<br>
 * <功能描述>
 *
 * @author zengguang
 *
 */
@Service
public class TradeRecordService {

    @Resource
    private TradeRecordMapper tradeRecordMapper;

    public List<Map<Object, Object>> getTerminals(int customerId) {
        return tradeRecordMapper.getTerminals(customerId);
    }

    public List<Map<Object, Object>> getTradeRecords(int tradeTypeId, String terminalNumber, String startTime, String endTime, int page, int rows) {
        Map<Object, Object> query = new HashMap<Object, Object>();
        query.put("tradeTypeId", tradeTypeId);
        query.put("terminalNumber", terminalNumber);
        query.put("startTime", startTime);
        query.put("endTime", endTime);

        Paging paging = new Paging(page, rows);
        query.put("offset", paging.getOffset());
        query.put("rows", paging.getRows());

        return tradeRecordMapper.getTradeRecords(query);
    }

    public Map<Object, Object> getTradeRecordTotal(int tradeTypeId, String terminalNumber, String startTime, String endTime) {
        Map<Object, Object> query = new HashMap<Object, Object>();
        query.put("tradeTypeId", tradeTypeId);
        query.put("terminalNumber", terminalNumber);
        query.put("startTime", startTime);
        query.put("endTime", endTime);
        return tradeRecordMapper.getTradeRecordTotal(query);
    }

}