package com.comdosoft.financial.user.controller.api;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
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
    
    /**
     * 获取城市列表
     * @return
     */
    @RequestMapping(value = "getCity", method = RequestMethod.POST)
    public Response getCity(){
        List<Map<String,Object>> citys = indexService.findAllCity();
        return Response.buildSuccess(citys, "");
    }
    
    /**
     * 根据手机号发送验证码
     * @param req
     * @return
     */
    @RequestMapping(value = "getPhoneCode", method = RequestMethod.POST)
    public Response getPhoneCode(@RequestBody MyOrderReq req){
        String code = indexService.getPhoneCode(req);
        if(code.equals("-1")){
            return Response.getError("发送失败，请重新再试");
        }
        return Response.buildSuccess(code, "发送成功");
    }
    
    //更新手机号  根据用户id查询，更新 新手机号
    @RequestMapping(value = "changePhone", method = RequestMethod.POST)
    public Response changePhone(@RequestBody MyOrderReq req){
        indexService.changePhone(req);
        return Response.getSuccess();
    }
    
    
}
