package com.comdosoft.financial.user.service.trades.record;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.comdosoft.financial.user.domain.Paging;
import com.comdosoft.financial.user.domain.trades.TradeRecord;
import com.comdosoft.financial.user.domain.zhangfu.PayChannel;
import com.comdosoft.financial.user.mapper.trades.record.TradeRecordMapper;
import com.comdosoft.financial.user.mapper.zhangfu.PaychannelMapper;
import com.comdosoft.financial.user.mapper.zhangfu.TerminalsMapper;

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

    @Resource
    private TerminalsMapper terminalsMapper;

    @Resource
    private PaychannelMapper paychannelMapper;

    public List<Map<Object, Object>> getTerminals(int customerId) {
        return terminalsMapper.getTerminals(customerId);
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

        List<Map<Object, Object>> list = null;
        switch (tradeTypeId) {
        case TradeRecord.TRADETYPEID_1:
            list = tradeRecordMapper.getTradeRecords12(query);
            break;
        case TradeRecord.TRADETYPEID_2:
            list = tradeRecordMapper.getTradeRecords12(query);
            break;
        case TradeRecord.TRADETYPEID_3:
            list = tradeRecordMapper.getTradeRecords3(query);
            break;
        case TradeRecord.TRADETYPEID_4:
            list = tradeRecordMapper.getTradeRecords4(query);
            break;
        case TradeRecord.TRADETYPEID_5:
            list = tradeRecordMapper.getTradeRecords5(query);
            break;
        default:
            list = new ArrayList<Map<Object, Object>>();
            break;
        }
        return list;
    }

    public Map<Object, Object> getTradeRecord(int tradeRecordId) {
        Map<Object, Object> result = null;
        switch (tradeRecordId) {
        case TradeRecord.TRADETYPEID_1:
            result = tradeRecordMapper.getTradeRecord12(tradeRecordId);
            break;
        case TradeRecord.TRADETYPEID_2:
            result = tradeRecordMapper.getTradeRecord12(tradeRecordId);
            break;
        case TradeRecord.TRADETYPEID_3:
            result = tradeRecordMapper.getTradeRecord3(tradeRecordId);
            break;
        case TradeRecord.TRADETYPEID_4:
            result = tradeRecordMapper.getTradeRecord4(tradeRecordId);
            break;
        case TradeRecord.TRADETYPEID_5:
            result = tradeRecordMapper.getTradeRecord5(tradeRecordId);
            break;
        default:
            result = new HashMap<>();
            break;
        }
        if (!CollectionUtils.isEmpty(result)) {// 支付通道转换
            PayChannel payChannel = paychannelMapper.getOne((int) result.get("payChannelId"));
            if (payChannel != null) {
                result.put("payChannelName", payChannel.getName());
            } else {
                result.put("payChannelName", null);
            }
        }
        return result;
    }

    public Map<Object, Object> getTradeRecordTotal(int tradeTypeId, String terminalNumber, String startTime, String endTime) {
        Map<Object, Object> query = new HashMap<Object, Object>();
        query.put("tradeTypeId", tradeTypeId);
        query.put("terminalNumber", terminalNumber);
        query.put("startTime", startTime);
        query.put("endTime", endTime);
        Map<Object, Object> result = tradeRecordMapper.getTradeRecordTotal(query);
        if (!CollectionUtils.isEmpty(result)) {// 支付通道转换
            PayChannel payChannel = paychannelMapper.getOne((int) result.get("payChannelId"));
            if (payChannel != null) {
                result.put("payChannelName", payChannel.getName());
            } else {
                result.put("payChannelName", null);
            }
        }
        return result;
    }

}