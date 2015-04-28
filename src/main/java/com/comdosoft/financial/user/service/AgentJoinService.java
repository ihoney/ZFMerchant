package com.comdosoft.financial.user.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.zhangfu.AgentsJoin;
import com.comdosoft.financial.user.mapper.zhangfu.AgentJoinMapper;

@Service
public class AgentJoinService {
	private static final Logger logger = Logger
			.getLogger(AgentJoinService.class);

	@Autowired
	private AgentJoinMapper agentJoinMapper;

	public int addNewJoinInfo(AgentsJoin agent) {
		try {
			agentJoinMapper.addNewInfo(agent);
			return 1;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("添加代理商加盟资料异常");
			return -1;
		}
	}
}
