package com.comdosoft.financial.user.controller.api;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.TradeReq;
import com.comdosoft.financial.user.service.trades.record.TradeRecordService2;


@RestController
@RequestMapping(value = "api/web/trade/record")
public class TradeRecordAPI2 {

    @Resource
    private TradeRecordService2 tradeRecordService2;

    /**
     * 日志记录器
     */
    private static final Logger logger = Logger.getLogger(TradeRecordAPI2.class);

    @RequestMapping(value = "getTradeRecords", method = RequestMethod.POST)
    public Response getTradeRecords(@RequestBody TradeReq req) {
        Response sysResponse = null;
        try {
            Map<String, Object> result = tradeRecordService2.getTradeRecordsCount(req);
            result.put("list", tradeRecordService2.getTradeRecords(req));
            sysResponse = Response.getSuccess(result);
        } catch (Exception e) {
            logger.error("查询交易流水信息失败", e);
            sysResponse = Response.getError("查询交易流水失败:系统异常");
        }
        return sysResponse;
    }

   

}