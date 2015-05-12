package com.comdosoft.financial.user.mapper.zhangfu;

import java.util.List;
import java.util.Map;

import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;


public interface CsRepairMapper {

    List<Map<String, Object>> findAll(MyOrderReq myOrderReq);
    
    List<Map<String, Object>> findTraceById(MyOrderReq myOrderReq);

    void cancelApply(MyOrderReq myOrderReq);
    
    void addMark(MyOrderReq myOrderReq);
    
    Map<String, Object> findById(MyOrderReq myOrderReq);

    int count(MyOrderReq myOrderReq);
    
    List<Map<String, Object>> search(MyOrderReq myOrderReq);

    int countSearch(MyOrderReq myOrderReq);
    
    void changeStatus(MyOrderReq myOrderReq);
    int updateRepair(MyOrderReq myOrderReq);
    
    List<Map<String, Object>> wxlist(MyOrderReq myOrderReq);

    /**
     * 根据维修编号查询是否存在支付成功，如果存在返回id号
     * @param myOrderReq
     * @return
     */
    Map<String, Object> repairPayFinish(MyOrderReq myOrderReq);

	Map<String, Object> findRepairByNumber(int parseInt);
//查询是否存在多条相同的支付记录
	int countRepair(Integer cs_repair_id);

}
