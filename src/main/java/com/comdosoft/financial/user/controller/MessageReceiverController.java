package com.comdosoft.financial.user.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.zhangfu.MessageReceiver;
import com.comdosoft.financial.user.domain.zhangfu.SysMessage;
import com.comdosoft.financial.user.service.MessageReceiverService;
import com.comdosoft.financial.user.utils.page.Page;

@RestController
@RequestMapping(value="/message/receiver")
public class MessageReceiverController {

    @Resource
    private MessageReceiverService messageReceiverService;
    
    @RequestMapping(value="findAll",method=RequestMethod.POST)
    public Response findAll(@RequestParam(value = "page", required = false) String page ){
        Response response = new Response();
        if(null == page) page="0";
        Page<MessageReceiver> mrs = messageReceiverService.findAll(Integer.parseInt(page),20,1);
        response.setResult(mrs);
        response.setCode(0);
        return response;
    }
    
    @RequestMapping(value="findById",method=RequestMethod.POST)
    public Response findById(@RequestParam(value = "id", required = false)String id){
        Response response = new Response();
        SysMessage sysMessage = messageReceiverService.findById(id);
        messageReceiverService.isRead(id);
        response.setResult(sysMessage);
        response.setCode(0);
        return response;
    }
    
    @RequestMapping(value="deleteById",method=RequestMethod.POST)
    public Response deleteById(String id){
        Response response = new Response();
        messageReceiverService.delete(id);
        response.setCode(0);
        response.setMessage("删除成功");
        return response;
    }
    
    @RequestMapping(value="batchDelete",method=RequestMethod.POST)
    public Response batchDelete(String[] ids){
        Response response = new Response();
        messageReceiverService.batchDelete(ids);
        response.setCode(0);
        response.setMessage("删除成功");
        return response;
    }
    
    @RequestMapping(value="batchRead",method=RequestMethod.POST)
    public Response batchRead(String[] ids){
        Response response = new Response();
        messageReceiverService.batchRead(ids);
        response.setCode(0);
        response.setMessage("更新成功");
        return response;
    }
}
