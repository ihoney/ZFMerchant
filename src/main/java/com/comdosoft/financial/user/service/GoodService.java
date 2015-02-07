package com.comdosoft.financial.user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.query.PosReq;
import com.comdosoft.financial.user.mapper.zhangfu.GoodMapper;
import com.comdosoft.financial.user.utils.SysUtils;

@Service
public class GoodService {

	@Autowired
	private GoodMapper goodMapper;
	
	


    public List<?> getGoodsList(PosReq posreq) {
        List<Map<String, Object>> list= goodMapper.getGoodsList(posreq);
        for (Map<String, Object> map : list) {
           int id=Integer.valueOf(""+map.get("id"));
            //支付通道
            posreq.setGoodId(id);
            List<Map<String,String>> payChannelList=goodMapper.getPayChannelListByGoodId(posreq);
            if(null!=payChannelList&&payChannelList.size()>0){
                map.put("pay_channe",payChannelList.get(0).get("name"));
            }
            //图片
            List<Map<String,String>> goodPics=goodMapper.getgoodPics(id);
            if(null!=goodPics&&goodPics.size()>0){
                map.put("url_path",goodPics.get(0).get("url_path"));
            }
        }
        return list;
    }


    public Map<String,Object> getGoods(PosReq posreq) {
        Map<String,Object> goodInfoMap=new HashMap<String, Object>();
        
        //支付通道
        List<Map<String,String>> payChannelList=goodMapper.getPayChannelListByGoodId(posreq);
        goodInfoMap.put("payChannelList", payChannelList);
        //图片
        List<Map<String,String>> goodPics=goodMapper.getgoodPics(posreq.getGoodId());
        goodInfoMap.put("goodPics", goodPics);
        //评论数
        int commentsCount=goodMapper.getCommentCount(posreq.getGoodId());
        goodInfoMap.put("commentsCount", commentsCount);
        //
        
        return goodInfoMap;
    }


    public Map<String, Object> getSearchCondition(PosReq posreq) {
        Map<String, Object> map=new HashMap<String, Object>();
        List<Map<String, Object>> list1=goodMapper.getBrands_ids();
        List<Map<String, Object>> list2=goodMapper.getFartherCategorys();
        if(null!=list2&&list2.size()>0){
            List<Map<String, Object>> list2son=null;
            for (Map<String, Object> map2 : list2) {
                list2son=goodMapper.getSonCategorys(SysUtils.String2int(""+map2.get("id")));
                map2.put("son", list2son);
            }
        }
        List<Map<String, Object>> list3=goodMapper.getPay_channel_ids(posreq);
        List<Map<String, Object>> list4=goodMapper.getPay_card_ids();
        List<Map<String, Object>> list5=goodMapper.getTrade_type_ids(posreq);
        List<Map<String, Object>> list6=goodMapper.getSale_slip_ids();
        List<Map<String, Object>> list7=goodMapper.getTDates(posreq);
        map.put("brands", list1);
        map.put("category", list2);
        map.put("pay_channel", list3);
        map.put("pay_card", list4);
        map.put("trade_type", list5);
        map.put("sale_slip", list6);
        map.put("tDate", list7);
        return map;
    }
	
	
	
}
