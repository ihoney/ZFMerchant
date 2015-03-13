package com.comdosoft.financial.user.controller.api;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.service.IndexService;

@RestController
@RequestMapping("api/index")
public class IndexController {

    @Autowired
    private IndexService indexService ;
    

    /**
     * 获取首页  收单机构列表
     * @return
     */
    @RequestMapping(value = "factory_list", method = RequestMethod.POST)
    public Response getFactoryList(){
        List<Map<String,Object>> result= indexService.getFactoryList();
        return Response.buildSuccess(result, "查询成功");
    }
    /**
     * 热卖pos
     * @return
     */
    @RequestMapping(value = "pos_list", method = RequestMethod.POST)
    public Response getPosList(){
        List<Map<String,Object>> result= indexService.getPosList();
        return Response.buildSuccess(result, "查询成功");
    }
    
    
    @RequestMapping(value = "getCity", method = RequestMethod.POST)
    public Response getCity(){
        List<Map<String,Object>> citys = indexService.findAllCity();
        return Response.buildSuccess(citys, "");
    }
}
