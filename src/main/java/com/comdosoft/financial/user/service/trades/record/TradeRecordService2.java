package com.comdosoft.financial.user.service.trades.record;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.query.TradeReq;
import com.comdosoft.financial.user.domain.trades.TradeRecord;
import com.comdosoft.financial.user.mapper.trades.record.TradeRecordMapper2;

/**
 * 业务层实现类<br>
 * <功能描述>
 *
 * @author zengguang
 *
 */
@Service
public class TradeRecordService2 {

    @Resource
    private TradeRecordMapper2 tradeRecordMapper2;



    public Map<String,Object> getTradeRecordsCount(TradeReq req) {
        Map<String,Object> map=null;
        switch (req.getTradeTypeId()) {
        case TradeRecord.TRADETYPEID_1:
            map = tradeRecordMapper2.getTradeRecordsCount12(req);
            break;
        case TradeRecord.TRADETYPEID_2:
            map = tradeRecordMapper2.getTradeRecordsCount12(req);
            break;
        case TradeRecord.TRADETYPEID_3:
            map = tradeRecordMapper2.getTradeRecordsCount3(req);
            break;
        case TradeRecord.TRADETYPEID_4:
            map = tradeRecordMapper2.getTradeRecordsCount4(req);
            break;
        case TradeRecord.TRADETYPEID_5:
            map = tradeRecordMapper2.getTradeRecordsCount5(req);
            break;
        default:
            map =new HashMap<String, Object>();
            break;
        }
        return map;
    }

    public List<Map<Object, Object>> getTradeRecords(TradeReq req) {

        List<Map<Object, Object>> list = null;
        switch (req.getTradeTypeId()) {
        case TradeRecord.TRADETYPEID_1:
            list = tradeRecordMapper2.getTradeRecords12(req);
            break;
        case TradeRecord.TRADETYPEID_2:
            list = tradeRecordMapper2.getTradeRecords12(req);
            break;
        case TradeRecord.TRADETYPEID_3:
            list = tradeRecordMapper2.getTradeRecords3(req);
            break;
        case TradeRecord.TRADETYPEID_4:
            list = tradeRecordMapper2.getTradeRecords4(req);
            break;
        case TradeRecord.TRADETYPEID_5:
            list = tradeRecordMapper2.getTradeRecords5(req);
            break;
        default:
            list = new ArrayList<Map<Object, Object>>();
            break;
        }
        return list;
    }

   

}