package com.comdosoft.financial.user.service.trades.record;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.query.TradeReq;
import com.comdosoft.financial.user.mapper.trades.record.TradeRecordMapper3;
import com.comdosoft.financial.user.mapper.zhangfu.SysShufflingFigureMapper;

@Service
public class TradeRecordService3 {

    @Resource
    private TradeRecordMapper3 tradeRecordMapper3;

    @Resource
    private SysShufflingFigureMapper tradeMapper;

    public Map<String,Object> getTradeRecordsCount(TradeReq req) {
        return tradeRecordMapper3.getTradeRecordsCount(req);
    }

    public List<Map<Object, Object>> getTradeRecords(TradeReq req) {
        return tradeRecordMapper3.getTradeRecords(req);
    }

    public List<Map<String, Object>> getTradeType() {
        return tradeMapper.getTradeType();
    }

    public Map<String, Object> getTradeRecord(TradeReq req) {
        Map<String, Object> result = tradeRecordMapper3.getTradeRecord(req);
       return result;
    }

   

}