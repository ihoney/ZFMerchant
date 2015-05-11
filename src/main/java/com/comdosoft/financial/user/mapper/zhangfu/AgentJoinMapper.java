package com.comdosoft.financial.user.mapper.zhangfu;

import com.comdosoft.financial.user.domain.zhangfu.AgentsJoin;

public interface AgentJoinMapper {

	void addNewInfo(AgentsJoin agent);
	
	AgentsJoin findAgentsJoinByNameAndPhone(String name,String phone);
}
