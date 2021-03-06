package com.comdosoft.financial.user.mapper.zhangfu;

import java.util.List;
import java.util.Map;

import com.comdosoft.financial.user.domain.zhangfu.AppVersion;
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;

public interface IndexMapper {

    List<Map<String, Object>> getFactoryList();

    List<Map<String, Object>> getPosList();

    List<Map<String, Object>> getParentCitiesList();

    List<Map<String, Object>> getChildrenCitiesList(String id);

    void changePhone(MyOrderReq req);

    List<Map<String, Object>> getAllCitiesList();

	AppVersion getVersion(AppVersion app);

	List<Map<String, Object>> getPosList2();
}
