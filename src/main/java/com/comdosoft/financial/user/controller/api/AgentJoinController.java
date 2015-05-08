package com.comdosoft.financial.user.controller.api;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.zhangfu.AgentsJoin;
import com.comdosoft.financial.user.service.AgentJoinService;
 
@RestController
@RequestMapping("api/agentjoin") 
public class AgentJoinController {

	@Autowired
	private AgentJoinService agentJoinService;
	
	@RequestMapping(value="addNewData")
	public Response addNewAgentJoinInfoCtl(@RequestBody AgentsJoin agent){
		Response req = new Response();
		int result = agentJoinService.addNewJoinInfo(agent);
		if(result == 1){
			req.setCode(req.SUCCESS_CODE);
		}else{
			req.setCode(req.ERROR_CODE);
		}
		return req;
	}
	
}
