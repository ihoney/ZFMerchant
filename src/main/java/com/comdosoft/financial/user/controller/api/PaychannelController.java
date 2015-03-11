package com.comdosoft.financial.user.controller.api;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.Intentionreq;
import com.comdosoft.financial.user.domain.query.PayChannelReq;
import com.comdosoft.financial.user.service.PayChannelService;

@RestController
@RequestMapping("api/paychannel")
public class PaychannelController {

    @Autowired
    private PayChannelService pcService ;

    @RequestMapping(value = "info", method = RequestMethod.POST)
    public Response getGoodsList(@RequestBody  PayChannelReq req){
        Response response = new Response();
        Map<String,Object> pcInfo= pcService.payChannelInfo(req.getPcid());
        response.setCode(Response.SUCCESS_CODE);
        response.setResult(pcInfo);
        return response;
    }
    
    @RequestMapping(value = "intention/add", method = RequestMethod.POST)
    public Response intention(@RequestBody Intentionreq req) {
        Response resp = new Response();
        int result=pcService.addIntention(req);
        if(result==1){
            resp.setCode(Response.SUCCESS_CODE);
        }else{
            resp.setCode(Response.ERROR_CODE);
        }
        return resp;
    }
}
