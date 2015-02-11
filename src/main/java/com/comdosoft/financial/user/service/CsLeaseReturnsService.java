package com.comdosoft.financial.user.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.domain.zhangfu.RepairStatus;
import com.comdosoft.financial.user.mapper.zhangfu.CsLeaseReturnsMapper;
import com.comdosoft.financial.user.utils.OrderUtils;
import com.comdosoft.financial.user.utils.page.Page;
import com.comdosoft.financial.user.utils.page.PageRequest;
@Service
public class CsLeaseReturnsService {

    @Resource
    private CsLeaseReturnsMapper csLeaseReturnsMapper;
    public Page<List<Object>> findAll(MyOrderReq myOrderReq) throws ParseException {
        PageRequest request = new PageRequest(myOrderReq.getPage(), myOrderReq.getPageSize());
        List<Map<String, Object>> o = csLeaseReturnsMapper.findAll(myOrderReq);
        List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
        Map<String,Object> map = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
        for(Map<String,Object> m: o){
            map = new HashMap<String,Object>();
            String d = (m.get("created_at")+"");
            Date date = sdf.parse(d);
            String c_date = sdf.format(date);
            String status = (m.get("status")+"");
            String status_name = RepairStatus.getName(Integer.parseInt(status));
            map.put("id",m.get("id"));
            map.put("status", status_name);
            map.put("create_time", c_date);
            map.put("terminal_num", m.get("serial_num"));//终端号
            map.put("apply_num", m.get("apply_num"));//维修编号
            list.add(map);
        }
        return new Page<List<Object>>(request, list);
    }

    public void cancelApply(MyOrderReq myOrderReq) {
        myOrderReq.setRepairStatus(RepairStatus.CANCEL);
        csLeaseReturnsMapper.cancelApply(myOrderReq);
    }

    public Map<String,Object> findById(MyOrderReq myOrderReq) throws ParseException {
        Map<String, Object> o = csLeaseReturnsMapper.findById(myOrderReq);
        Map<String,Object> map = new HashMap<String,Object>();
        String id = o.get("id").toString();
        map.put("id", id);
        String status_name = RepairStatus.getName(Integer.parseInt(o.get("apply_status")+""));
        map.put("status", status_name);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String apply_time =   o.get("apply_time")+"";
        String one_time = o.get("one_time")+""; // cs_lease_retruns. created_at
        String two_time = o.get("two_time")+""; // order updated_at  
        map.put("apply_time", sdf.format(sdf.parse(apply_time)));
        map.put("terminal_num", o.get("serial_num")+"");
        map.put("brand_name", o.get("brand_name")+"");
        map.put("brand_number", o.get("brand_number")+"");
        map.put("zhifu_pingtai", o.get("zhifu_pt")+"");
        map.put("merchant_name", o.get("merchant_name")+"");
        map.put("merchant_phone", o.get("mer_phone")+"");
        map.put("receiver_name", o.get("contact")+"");
        map.put("receiver_phone", o.get("phone")+"");
        map.put("lease_price", o.get("lease_price")+"");//租赁价格
        System.err.println(one_time);
        
        map.put("lease_deposit", o.get("lease_deposit")+""); //租赁押金
        map.put("lease_time", o.get("lease_time")+""); //最少租赁时间，月为单位
        map.put("return_time", o.get("return_time")+""); //租赁归还时间，月为单位
        myOrderReq.setId(Integer.parseInt(id));
        List<Map<String,Object>> list = csLeaseReturnsMapper.findTraceById(myOrderReq);
        map.put("comments", OrderUtils.getTraceByVoId(myOrderReq, list));
        return map;
    }
    
    public void addMark(MyOrderReq myOrderReq) {
        csLeaseReturnsMapper.addMark(myOrderReq);
    }

}
