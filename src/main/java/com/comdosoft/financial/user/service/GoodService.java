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
        List<Map<String, Object>> list = goodMapper.getGoodsList(posreq);
        for (Map<String, Object> map : list) {
            int id = Integer.valueOf("" + map.get("id"));
            // 支付通道
            posreq.setGoodId(id);
            List<Map<String, Object>> payChannelList = goodMapper.getPayChannelListByGoodId(posreq);
            if (null != payChannelList && payChannelList.size() > 0) {
                map.put("pay_channe", payChannelList.get(0).get("name"));
            }
            // 图片
            List<Map<String, Object>> goodPics = goodMapper.getgoodPics(id);
            if (null != goodPics && goodPics.size() > 0) {
                map.put("url_path", goodPics.get(0).get("url_path"));
            }
        }
        return list;
    }

    public Map<String, Object> getGoods(PosReq posreq) {
        Map<String, Object> goodInfoMap = null;
        // 商品信息
        Map<String, Object> goodinfo = goodMapper.getGoodById(posreq.getGoodId());
        int id = SysUtils.String2int("" + goodinfo.get("id"));
        if (id > 0) {
            goodInfoMap = new HashMap<String, Object>();
            goodInfoMap.put("goodinfo", goodinfo);
            // 支付通道
            List<Map<String, Object>> payChannelList = goodMapper.getPayChannelListByGoodId(posreq);
            if (null != payChannelList && payChannelList.size() > 0) {
                for (Map<String, Object> map : payChannelList) {
                    int pcid = SysUtils.String2int("" + map.get("id"));
                    if (pcid > 0) {
                        // 支付通道交易费率
                        List<Map<String, Object>> tDates = goodMapper.getTDatesByPayChannel(pcid);
                        map.put("tDates", tDates);
                        // 支付通道开通所需材料 对公
                        List<Map<String, Object>> requireMaterial_pub = goodMapper.getRequireMaterial_pub(pcid);
                        map.put("requireMaterial_pub", requireMaterial_pub);
                        // 支付通道开通所需材料 对私
                        List<Map<String, Object>> requireMaterial_pra = goodMapper.getRequireMaterial_pra(pcid);
                        map.put("requireMaterial_pra", requireMaterial_pra);
                        //支持区域
                        List<String> supportArea=goodMapper.getSupportArea(pcid);
                        map.put("supportArea", supportArea);
                        //刷卡交易标准手续费
                        List<Map<String, Object>> standard_rates = goodMapper.getStandard_rates(pcid);
                        map.put("other_rate", standard_rates);
                        //其他交易费率
                        List<Map<String, Object>> other_rate = goodMapper.getOther_rate(pcid);
                        map.put("other_rate", other_rate);
                        
                    }
                }
                goodInfoMap.put("payChannelList", payChannelList);
            }
            // 图片
            List<Map<String, Object>> goodPics = goodMapper.getgoodPics(posreq.getGoodId());
            goodInfoMap.put("goodPics", goodPics);
            // 评论数
            int commentsCount = goodMapper.getCommentCount(posreq.getGoodId());
            goodInfoMap.put("commentsCount", commentsCount);
            // 生产厂家
            int factoryId = SysUtils.String2int("" + goodinfo.get("factory_id"));
            if (factoryId > 0) {
                Map<String, Object> factoryMap = goodMapper.getFactoryById(factoryId);
                goodInfoMap.put("factory", factoryMap);
            }

        }
        return goodInfoMap;
    }

    public Map<String, Object> getSearchCondition(PosReq posreq) {
        Map<String, Object> map = new HashMap<String, Object>();
        List<Map<String, Object>> list1 = goodMapper.getBrands_ids();
        List<Map<String, Object>> list2 = goodMapper.getFartherCategorys();
        if (null != list2 && list2.size() > 0) {
            List<Map<String, Object>> list2son = null;
            for (Map<String, Object> map2 : list2) {
                list2son = goodMapper.getSonCategorys(SysUtils.String2int("" + map2.get("id")));
                map2.put("son", list2son);
            }
        }
        List<Map<String, Object>> list3 = goodMapper.getPay_channel_ids(posreq);
        List<Map<String, Object>> list4 = goodMapper.getPay_card_ids();
        List<Map<String, Object>> list5 = goodMapper.getTrade_type_ids(posreq);
        List<Map<String, Object>> list6 = goodMapper.getSale_slip_ids();
        List<Map<String, Object>> list7 = goodMapper.getTDatesByCityId(posreq);
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
