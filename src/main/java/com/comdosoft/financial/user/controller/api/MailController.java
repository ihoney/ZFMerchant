package com.comdosoft.financial.user.controller.api;


import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.query.MailReq;
import com.comdosoft.financial.user.service.MailService;


@RestController
@RequestMapping(value = "/api/mail")
public class MailController {
    
    @Resource
    private MailService MailService;
    
    @RequestMapping(value = "register", method = RequestMethod.POST)
    public void send(@RequestBody MailReq req) {
        MailService.sendMailWithFilesAsynchronous(req);
    }
}
