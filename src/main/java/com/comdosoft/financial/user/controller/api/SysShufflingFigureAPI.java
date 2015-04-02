package com.comdosoft.financial.user.controller.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.service.SysShufflingFigureService;

/**
 * 
 * 首页 - 轮播图<br>
 * <功能描述>
 *
 * @author zengguang 2015年2月7日
 *
 */
@RestController
@RequestMapping(value = "api/index/sysshufflingfigure")
public class SysShufflingFigureAPI {

    @Resource
    private SysShufflingFigureService sysShufflingFigureService;

    /**
     * 日志记录器
     */
    private static final Logger logger = Logger.getLogger(SysShufflingFigureAPI.class);

    /**
     * 获取首页轮播图列表
     * 
     * @param customerId
     */
    @RequestMapping(value = "getList", method = RequestMethod.POST)
    public Response getList() {
        Response sysResponse = null;
        try {
            sysResponse = Response.getSuccess(sysShufflingFigureService.getList());
        } catch (Exception e) {
            logger.error("获取首页轮播图列表失败", e);
            sysResponse = Response.getError("获取首页轮播图列表失败:系统异常");
        }
        return sysResponse;
    }
    
    @RequestMapping(value = "getList2", method = RequestMethod.POST)
    public Response getList2() {
        Response sysResponse = null;
        try {
            List<Map<Object, Object>> list=sysShufflingFigureService.getList();
            Map<Object, Object> map=new HashMap<Object, Object>();
            map.put("list", list);
            map.put("total", list.size());
            sysResponse = Response.getSuccess(map);
        } catch (Exception e) {
            logger.error("获取首页轮播图列表失败", e);
            sysResponse = Response.getError("获取首页轮播图列表失败:系统异常");
        }
        return sysResponse;
    }

}