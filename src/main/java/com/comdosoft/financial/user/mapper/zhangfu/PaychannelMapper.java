package com.comdosoft.financial.user.mapper.zhangfu;

import java.util.List;
import java.util.Map;

import com.comdosoft.financial.user.domain.query.Intentionreq;
import com.comdosoft.financial.user.domain.zhangfu.PayChannel;

public interface PaychannelMapper {

    List<Map<String, Object>> getTDatesByPayChannel(int pcid);

    List<String> getSupportArea(int pcid);

    List<Map<String, Object>> getRequireMaterial_pra(int pcid);

    List<Map<String, Object>> getRequireMaterial_pub(int pcid);

    List<Map<String, Object>> getStandard_rates(int pcid);

    List<Map<String, Object>> getOther_rate(int pcid);

    PayChannel getOne(int payChannelId);

    Map<String, Object> getPcinfo(int pcid);

    Map<String, Object> getFactoryById(int factoryId);

    void addIntention(Intentionreq req);

    String getAgentName(int agentId);

}