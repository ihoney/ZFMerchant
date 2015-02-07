package com.comdosoft.financial.user.mapper.zhangfu;

import java.util.Map;

/**
 * 用户 - 数据层
 * 
 * @author
 *
 */
public interface CustomerMapper {

    Map<Object, Object> getOne(int id);

    void updatePassword(Map<Object, Object> param);

}