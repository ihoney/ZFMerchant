package com.comdosoft.financial.manage.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.comdosoft.financial.manage.domain.trades.GoodProfit;
import com.comdosoft.financial.manage.mapper.trades.GoodProfitMapper;

@Service
public class GoodProfitService {

	@Autowired
	private GoodProfitMapper goodProfitMapper;
	
	public void create(){
		GoodProfit goodProfit = new GoodProfit();
		goodProfit.setAgentId(2);
		goodProfit.setCreateAt(new Date());
		goodProfit.setProfit(5);
		byte b = 2;
		goodProfit.setTypes(b);
		goodProfitMapper.insert(goodProfit);
	}
	
}
