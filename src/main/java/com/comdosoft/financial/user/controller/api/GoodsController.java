package com.comdosoft.financial.user.controller.api;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.PosReq;
import com.comdosoft.financial.user.service.GoodService;

@Controller
@RequestMapping("Goods")
public class GoodsController {

    @Autowired
    private GoodService goodService ;

    @RequestMapping(value = "GoodsList", method = RequestMethod.POST)
    @ResponseBody
    public Response getGoodsList(@RequestBody PosReq posreq){
        Response response = new Response();
        List<?> goods= goodService.getGoodsList(setPosReq(posreq));
        response.setCode(Response.SUCCESS_CODE);
        response.setResult(goods);
        return response;
    }
    
    private PosReq setPosReq(PosReq req){
        if(0==req.getPage()){
            req.setPage(1);
        }
        if(null==req.getBrands_id()){
            
        }
        return req;
    }
    
    @RequestMapping(value = "getGoods", method = RequestMethod.POST)
    @ResponseBody
    public Response getGoods(@RequestBody PosReq posreq){
        Response response = new Response();
        if(posreq.getGoodId()>0){
            Map<String, Object> goodInfoMap=goodService.getGoods(posreq.getGoodId());
            response.setCode(Response.SUCCESS_CODE);
            response.setResult(goodInfoMap);
        }
        return response;
    }
    
    @RequestMapping(value = "SearchCondition", method = RequestMethod.POST)
    @ResponseBody
    public String getSearchCondition(){
        return "";
    }
    
   
}
