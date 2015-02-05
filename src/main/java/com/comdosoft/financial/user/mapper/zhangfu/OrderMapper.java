package com.comdosoft.financial.user.mapper.zhangfu;

import java.util.List;

import com.comdosoft.financial.user.domain.zhangfu.Order;
import com.comdosoft.financial.user.utils.page.PageRequest;

public interface OrderMapper {

    int count(String pid);

    List<Order> findAll(PageRequest request, String pid);

}
