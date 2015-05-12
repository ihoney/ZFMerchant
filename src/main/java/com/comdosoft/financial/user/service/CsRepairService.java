package com.comdosoft.financial.user.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.comdosoft.financial.user.domain.zhangfu.CsRepairPayment;
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.domain.zhangfu.RepairStatus;
import com.comdosoft.financial.user.domain.zhangfu.UpdateStatus;
import com.comdosoft.financial.user.mapper.zhangfu.CsRepairMapper;
import com.comdosoft.financial.user.mapper.zhangfu.CsRepairPaymentMapper;
import com.comdosoft.financial.user.utils.OrderUtils;
import com.comdosoft.financial.user.utils.page.Page;
import com.comdosoft.financial.user.utils.page.PageRequest;

@Service
public class CsRepairService {
    
    @Resource
    private CsRepairMapper repairMapper;
    @Resource
    private CsRepairPaymentMapper repairPaymentMapper;

    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(CsRepairService.class);
    
    public Page<List<Object>> findAll(MyOrderReq myOrderReq) throws ParseException {
        PageRequest request = new PageRequest(myOrderReq.getPage(), myOrderReq.getRows());
        List<Map<String, Object>> o = repairMapper.findAll(myOrderReq);
        int count = repairMapper.count(myOrderReq);
        List<Map<String, Object>> list = putDate(o);
        return new Page<List<Object>>(request, list,count);
    }

    public List<Map<String, Object>> putDate(List<Map<String, Object>> o) throws ParseException {
        List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
        Map<String,Object> map = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
        for(Map<String,Object> m: o){
            map = new HashMap<String,Object>();
            String d = (m.get("created_at")==null?"":m.get("created_at").toString());
            if(d==""){
                map.put("create_time", "");
            }else{
                Date date = sdf.parse(d);
                String c_date = sdf.format(date);
                map.put("create_time", c_date);
            }
            String status = (m.get("status")==null?"":m.get("status").toString());
            map.put("id",m.get("id")==null?"":m.get("id"));
            map.put("status", status);
            map.put("terminal_num", m.get("serial_num")==null?"":m.get("serial_num"));//终端号
            map.put("apply_num", m.get("apply_num")==null?"":m.get("apply_num"));//维修编号
            map.put("repair_price", m.get("repair_price")==null?"":m.get("repair_price"));
            map.put("brand_name", m.get("brand_name")==null?"":m.get("brand_name"));
            map.put("brand_number", m.get("brand_number")==null?"":m.get("brand_number"));
            map.put("zhifu_pingtai", m.get("zhifu_pt")==null?"":m.get("zhifu_pt"));
            map.put("merchant_name", m.get("merchant_name")==null?"":m.get("merchant_name"));
            map.put("merchant_phone", m.get("mer_phone")==null?"":m.get("mer_phone"));
            list.add(map);
        }
        return list;
    }

    public void cancelApply(MyOrderReq myOrderReq) {
        myOrderReq.setRepairStatus(RepairStatus.CANCEL);
        repairMapper.cancelApply(myOrderReq);
    }

    public Map<String,Object> findById(MyOrderReq myOrderReq) throws ParseException {
        Map<String, Object> o = repairMapper.findById(myOrderReq);
        Map<String,Object> map = new HashMap<String,Object>();
        String id = o.get("id").toString();
        map.put("id", id);
        map.put("status", o.get("apply_status"));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String apply_time =   o.get("apply_time")==null?"":o.get("apply_time").toString();
        map.put("apply_num", o.get("apply_num"));//维修编号
        if(apply_time==""){
            map.put("apply_time", "");
        }else{
            map.put("apply_time", sdf.format(sdf.parse(apply_time)));
        }
        map.put("terminal_num", o.get("serial_num")==null?"":o.get("serial_num"));
        map.put("brand_name", o.get("brand_name")==null?"":o.get("brand_name"));
        map.put("brand_number", o.get("brand_number")==null?"":o.get("brand_number"));
        map.put("zhifu_pingtai", o.get("zhifu_pt")==null?"":o.get("zhifu_pt"));
        map.put("merchant_name", o.get("merchant_name")==null?"":o.get("merchant_name"));
        map.put("merchant_phone", o.get("mer_phone")==null?"":o.get("mer_phone"));
        map.put("repair_price", o.get("repair_price")==null?"":o.get("repair_price"));
        map.put("receiver_addr", o.get("address")==null?"":o.get("address"));
        map.put("receiver_person", o.get("receiver")==null?"":o.get("receiver"));
        map.put("receiver_phone", o.get("receiver_phone")==null?"":o.get("receiver_phone"));
        map.put("change_reason", o.get("description")==null?"":o.get("description"));
        myOrderReq.setId(Integer.parseInt(id));
        List<Map<String,Object>> list = repairMapper.findTraceById(myOrderReq);
        map.put("comments", OrderUtils.getTraceByVoId(myOrderReq, list));
        return map;
    }
    
    public void addMark(MyOrderReq myOrderReq) {
        repairMapper.addMark(myOrderReq);
    }

    public Page<List<Object>> getTraceById(MyOrderReq myOrderReq) throws ParseException {
        List<Map<String,Object>> list = repairMapper.findTraceById(myOrderReq);
        return OrderUtils.getTraceByVoId(myOrderReq, list);
    }
    
    public void resubmitCancel(MyOrderReq myOrderReq) {
        myOrderReq.setUpdateStatus(UpdateStatus.PENDING);
        repairMapper.changeStatus(myOrderReq);
    }

    public Page<List<Object>> search(MyOrderReq myOrderReq) throws ParseException {
        PageRequest request = new PageRequest(myOrderReq.getPage(), myOrderReq.getRows());
        List<Map<String, Object>> o = repairMapper.search(myOrderReq);
        int count = repairMapper.countSearch(myOrderReq);
        List<Map<String, Object>> list = putDate(o);
        return new Page<List<Object>>(request, list,count);
    }
    
    public List<Map<String, Object>> wxlist(MyOrderReq myOrderReq) {
        return repairMapper.wxlist(myOrderReq);
    }

    /**
     * 终端：{{order.serial_num}}维修的费用
     * @param myOrderReq
     * @return
     */
    public Map<String, Object> repairPay(MyOrderReq myOrderReq) {
        Map<String, Object> o = repairMapper.findById(myOrderReq);
        Map<String,Object> map = new HashMap<String,Object>();
        String id = o.get("id").toString();
        map.put("id", id);
        map.put("apply_num", o.get("apply_num"));//维修编号
        map.put("repair_price", o.get("repair_price")==null?"":o.get("repair_price"));
        map.put("receiver_addr", o.get("address")==null?"":o.get("address"));
        map.put("receiver_person", o.get("receiver")==null?"":o.get("receiver"));
        map.put("receiver_phone", o.get("receiver_phone")==null?"":o.get("receiver_phone"));
        map.put("miaoshu", o.get("serial_num")==null?"":"终端"+o.get("serial_num")+"维修的费用");//付款描述  终端：维修的费用
        return map;
    }

    public Map<String, Object> repairPayFinish(MyOrderReq myOrderReq) {
        Map<String, Object> paymap = repairMapper.repairPayFinish(myOrderReq);
        Map<String,Object> map = new HashMap<String,Object>();
        if(null == paymap){
        	return paymap;
        }
        String pay_id = paymap.get("id")==null?"":paymap.get("id")+"";
        Map<String, Object> o = repairMapper.findById(myOrderReq);
        if(pay_id.equals("")){
            map.put("pay_status", false);
        }else{
            map.put("pay_status", true);
        }
        String id = o.get("id").toString();
        map.put("id", id);
        map.put("apply_num", o.get("apply_num"));//维修编号
        map.put("repair_price", o.get("repair_price")==null?"":o.get("repair_price"));
        return map;
    }
    
    @Transactional(value = "transactionManager-zhangfu")
	public Integer repairSuccess(String ordernumber) {
		Map<String,Object> repairMap = repairMapper.findRepairByNumber(ordernumber);
		logger.debug("维修回调start》》》》ordernumber   "+ ordernumber+" >>>repairMap"+ repairMap);
		if(null == repairMap){
			return 0;
		}
		String id = repairMap.get("id")+"";
		int c = repairMapper.countRepair(Integer.parseInt(id));
		if(c>0){
			logger.debug("维修单号: " +id+"已经存在一条付款记录了。。");
			return 0;
		}
		String price = repairMap.get("repair_price")+"";
		CsRepairPayment crp = new CsRepairPayment();
		crp.setRepairPrice(Integer.parseInt(price));
		crp.setCsRepairId(Integer.parseInt(id));
		int i = repairPaymentMapper.insertPayment(crp);
		logger.debug("insertpayment>>>>>"+ i);
		MyOrderReq mr = new MyOrderReq();
		mr.setId(Integer.parseInt(id));
		mr.setRepairStatus(RepairStatus.PAID);
		int j = repairMapper.updateRepair(mr);
		logger.debug(" repair over......."+ j);
		return 1;
	}
}
