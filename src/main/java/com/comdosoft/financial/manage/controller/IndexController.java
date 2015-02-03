package com.comdosoft.financial.manage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.comdosoft.financial.manage.service.GoodProfitService;

@Controller
public class IndexController {
	
	@Autowired
	private GoodProfitService goodProfitService;
	
	@RequestMapping(value="index",method=RequestMethod.GET)
	public String index(){
		return "index";
	}
}
