package com.comdosoft.financial.user.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.zhangfu.WebMessage;
import com.comdosoft.financial.user.service.WebMessageService;
import com.comdosoft.financial.user.utils.page.Page;

/**
 * 
 * 系统公告<br>
 * <功能描述>
 *
 * @author gch 2015年2月4日
 *
 */
@RestController
@RequestMapping(value = "/web/message")
public class WebMessageController {

    @Resource
    private WebMessageService webMessageService;

    @RequestMapping(value = "findAll", method = RequestMethod.POST)
    public Response findAll(@RequestParam(value = "page", required = false) String page) {
        Response response = new Response();
        if (null == page)
            page = "1";
        Page<WebMessage> centers = webMessageService.findAll(Integer.parseInt(page), 20);
        response.setCode(0);
        response.setResult(centers);
        return response;
    }

    @RequestMapping(value = "findById", method = RequestMethod.POST)
    public Response findById(@RequestParam(value = "id", required = false) String id) {
        Response response = new Response();
        WebMessage centers = webMessageService.findById(id);
        response.setCode(0);
        response.setResult(centers);
        return response;
    }

}
