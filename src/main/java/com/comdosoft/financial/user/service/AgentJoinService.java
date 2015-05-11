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

	/**
	 * 检查当前申请人的资料是否已存在
	 * 
	 * @return
	 */
	private boolean checkRepeat(AgentsJoin aj) {
		return agentJoinMapper.findAgentsJoinByNameAndPhone(aj.getTouchName(),
				aj.getTouchPhone()) == null ? true : false;
	}

	public int addNewJoinInfo(AgentsJoin agent) {
		try {
			System.out.println(checkRepeat(agent));
			if (checkRepeat(agent)) {
				agentJoinMapper.addNewInfo(agent);
				return 1;
			} else {
				logger.info("当前添加的合作伙伴已存在!");
				return -2;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("添加代理商加盟资料异常");
			return -1;
		}
	}
}
