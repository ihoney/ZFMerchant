package com.comdosoft.financial.manage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.comdosoft.financial.manage.domain.zhangfu.Factory;
import com.comdosoft.financial.manage.mapper.zhangfu.FactoryMapper;

@Service
public class FactoryService {
	
	@Autowired
	private FactoryMapper factoryMapper;
	
	public List<Factory> findCheckedFactories(){
		return factoryMapper.selectFactoriesByStatus(Factory.STATUS_CHECKED);
	}
	
}
