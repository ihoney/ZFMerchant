package com.comdosoft.financial.user.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

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

    public List<Map<Object, Object>> getList() {
        return sysShufflingFigureMapper.getList();
    }

}