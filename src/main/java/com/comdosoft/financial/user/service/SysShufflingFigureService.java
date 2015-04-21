package com.comdosoft.financial.user.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.mapper.zhangfu.SysShufflingFigureMapper;

/**
 * 首页轮播图 - 业务层<br>
 *
 * @author Java-007 2015年2月7日
 *
 */
@Service
public class SysShufflingFigureService {

    @Resource
    private SysShufflingFigureMapper sysShufflingFigureMapper;
    
    @Value("${filePath}")
    private String filePath;

    public List<Map<Object , Object>> getList() {
        List<Map<Object , Object>> result=sysShufflingFigureMapper.getList();
        for (int i = 0; i < result.size(); i++) {
            Map<Object, Object> m=result.get(i);
            m.put("picture_url", filePath+m.get("picture_url"));
            result.set(i, m);
        }
        return result;
    }

}