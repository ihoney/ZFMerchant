package com.comdosoft.financial.user.mapper.zhangfu;

import java.util.List;
import java.util.Map;

public interface IndexMapper {

    List<Map<String, Object>> getFactoryList();

    List<Map<String, Object>> getPosList();

    List<Map<String, Object>> getParentCitiesList();

    List<Map<String, Object>> getChildrenCitiesList(String id);

}
