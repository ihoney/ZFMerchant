package com.comdosoft.financial.user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.query.PosReq;
import com.comdosoft.financial.user.mapper.zhangfu.GoodMapper;

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
	
	
	
}
