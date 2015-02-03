package com.comdosoft.financial.manage.service;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.comdosoft.financial.manage.domain.zhangfu.PosCategory;
import com.comdosoft.financial.manage.mapper.zhangfu.PosCategoryMapper;
import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;

@Service
public class PosCategoryService {

	@Autowired
	private PosCategoryMapper posCategoryMapper;
	
	public Collection<PosCategory> listAll(){
		List<PosCategory> categories = posCategoryMapper.selectAll();
		Multimap<Integer, PosCategory> myMultimap = ArrayListMultimap.create();  
		if (categories != null) {
			for (PosCategory posCategory : categories) {
				if (posCategory.getParentId() == null) {
					myMultimap.put(posCategory.getId(), posCategory);
				}
			}
			for (PosCategory posCategory : categories) {
				if (posCategory.getParentId() != null) {
					myMultimap.put(posCategory.getParentId(), posCategory);
				}
			}
		}
		return myMultimap.values();
	}
	

}
