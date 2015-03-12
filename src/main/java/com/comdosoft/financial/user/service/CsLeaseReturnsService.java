package com.comdosoft.financial.user.service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.domain.zhangfu.RepairStatus;
import com.comdosoft.financial.user.domain.zhangfu.UpdateStatus;
import com.comdosoft.financial.user.mapper.zhangfu.CsLeaseReturnsMapper;
import com.comdosoft.financial.user.utils.OrderUtils;
import com.comdosoft.financial.user.utils.page.Page;
import com.comdosoft.financial.user.utils.page.PageRequest;

@Service
public class CsLeaseReturnsService {

    private static final Logger logger = LoggerFactory.getLogger(CsLeaseReturnsService.class);
    @Resource
    private CsLeaseReturnsMapper csLeaseReturnsMapper;
    @Resource
    private CsCencelsService csCencelsService;
    
    public Page<List<Object>> findAll(MyOrderReq myOrderReq) throws ParseException {
        PageRequest request = new PageRequest(myOrderReq.getPage(), myOrderReq.getPageSize());
        List<Map<String, Object>> o = csLeaseReturnsMapper.findAll(myOrderReq);
        int count = csLeaseReturnsMapper.count(myOrderReq);
        List<Map<String, Object>> list = putDate(o);
        return new Page<List<Object>>(request, list,count);
    }

    public void cancelApply(MyOrderReq myOrderReq) {
        myOrderReq.setRepairStatus(RepairStatus.CANCEL);
        csLeaseReturnsMapper.cancelApply(myOrderReq);
    }

    public Map<String, Object> findById(MyOrderReq myOrderReq) throws ParseException {
        logger.debug("findById==>>"+myOrderReq);
        Map<String, Object> o = csLeaseReturnsMapper.findById(myOrderReq);
        Map<String, Object> map = new HashMap<String, Object>();
        String id = o.get("id").toString();
        map.put("id", id);
        map.put("status", o.get("apply_status"));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat _sdf = new SimpleDateFormat("yyyy-MM-dd");
        String apply_time = o.get("apply_time") + "";
        String one_time = o.get("one_time") + ""; // cs_lease_retruns. created_at
        String two_time = o.get("two_time") + ""; // order updated_at
        String one_d = _sdf.format(_sdf.parse(one_time));
        String two_d = _sdf.format(_sdf.parse(two_time));
//        logger.debug("one_d==="+one_d+"===>>>two_d=="+two_d);
        int day = OrderUtils.compareDate(one_d, two_d);// 租赁时长
        map.put("apply_time", sdf.format(sdf.parse(apply_time)));
        map.put("lease_time", two_d);//租赁日期
        map.put("terminal_num", o.get("serial_num")==null?"":o.get("serial_num"));
        map.put("apply_num", o.get("apply_num")==null?"":o.get("apply_num"));
        map.put("brand_name", o.get("brand_name")==null?"":o.get("brand_name"));
        map.put("brand_number", o.get("brand_number")==null?"":o.get("brand_number"));
        map.put("zhifu_pingtai", o.get("zhifu_pt")==null?"":o.get("zhifu_pt"));
        map.put("merchant_name", o.get("merchant_name") ==null ?"":o.get("merchant_name"));
        map.put("merchant_phone", o.get("mer_phone")==null?"":o.get("mer_phone"));
        map.put("receiver_name", o.get("receiver")==null?"":o.get("receiver"));
        map.put("receiver_phone", o.get("receiver_phone") ==null?"":o.get("receiver_phone"));
        map.put("receiver_addr", o.get("address") ==null?"":o.get("address"));
      
        float f = day / 30;
        int month = 1;
        if (f > 1) {
            month = (int) Math.ceil(f);
        }
        int zj = (int) o.get("lease_price");// 每个月的租金
        Integer total_zj = zj * month;
        map.put("lease_price", total_zj);// 总共租金
        Integer lease_deposit = (Integer) (o.get("lease_deposit") ==null?"":o.get("lease_deposit"));
        map.put("lease_deposit", lease_deposit); // 租赁押金
        BigDecimal return_price = new BigDecimal(lease_deposit).subtract(new BigDecimal(total_zj));
        logger.debug("return_price==>>"+return_price);
        map.put("return_price", return_price); // 退还金额
        map.put("lease_length", day + ""); // 租赁时长 天
        int min = (int) o.get("lease_time");// 最少租赁时间，月为单位
        int max = (int) o.get("return_time");// 租赁归还时间，月为单位
        map.put("lease_min_time", min * 30); // 最短时间 天
        map.put("lease_max_time", max * 30); // 最长时间 天
//        logger.debug("租赁id为"+id+"的租赁押金："+o.get("lease_deposit")+" 租金："+zj*month+
//                "  租赁时长:"+day+"天"+"  最长租赁时间："+max * 30+"天"+" 最短租赁时间:"+min*30+"天");
        myOrderReq.setId(Integer.parseInt(id));
        List<Map<String, Object>> list = csLeaseReturnsMapper.findTraceById(myOrderReq);
        String json = o.get("templete_info_xml")+"";
        map = csCencelsService.getTemplePaths(map, json);
        map.put("comments", OrderUtils.getTraceByVoId(myOrderReq, list));
        return map;
    }

    public void addMark(MyOrderReq myOrderReq) {
        csLeaseReturnsMapper.addMark(myOrderReq);
    }

    public void resubmitCancel(MyOrderReq myOrderReq) {
        myOrderReq.setUpdateStatus(UpdateStatus.PENDING);
        csLeaseReturnsMapper.changeStatus(myOrderReq);
    }

    public Page<List<Object>> search(MyOrderReq myOrderReq) throws ParseException {
        PageRequest request = new PageRequest(myOrderReq.getPage(), myOrderReq.getPageSize());
        List<Map<String, Object>> o = csLeaseReturnsMapper.search(myOrderReq);
        int count = csLeaseReturnsMapper.countSearch(myOrderReq);
        List<Map<String, Object>> list = putDate(o);
        return new Page<List<Object>>(request, list,count);
    }

    public List<Map<String, Object>> putDate(List<Map<String, Object>> o) throws ParseException {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Map<String, Object> map = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for (Map<String, Object> m : o) {
            map = new HashMap<String, Object>();
            String d = (m.get("created_at") + "");
            Date date = sdf.parse(d);
            String c_date = sdf.format(date);
            String status = (m.get("status") + "");
            map.put("id", m.get("id"));
            map.put("status", status);
            map.put("create_time", c_date);
            map.put("terminal_num", m.get("serial_num"));// 终端号
            map.put("apply_num", m.get("apply_num"));// 维修编号
            map.put("brand_name", m.get("brand_name")+"");
            map.put("brand_number", m.get("brand_number")+"");
            map.put("zhifu_pingtai", m.get("zhifu_pt")+"");
            map.put("merchant_name", m.get("merchant_name")+"");
            map.put("merchant_phone", m.get("mer_phone")+"");
            list.add(map);
        }
        return list;
    }

}
