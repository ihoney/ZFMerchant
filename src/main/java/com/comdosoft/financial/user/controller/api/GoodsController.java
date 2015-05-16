package com.comdosoft.financial.user.controller.api;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.PosReq;
import com.comdosoft.financial.user.service.GoodService;
import com.comdosoft.financial.user.utils.SysUtils;

@RestController
@RequestMapping("api/good")
public class GoodsController {

    @Autowired
    private GoodService goodService ;

    @RequestMapping(value = "list", method = RequestMethod.POST)
    public Response getGoodsList(@RequestBody  PosReq posreq){
        Response response = new Response();
        Map<String,Object> goods= goodService.getGoodsList(setPosReq(posreq));
        response.setCode(Response.SUCCESS_CODE);
        response.setResult(goods);
        return response;
    }
    
    private PosReq setPosReq(PosReq req){
        if(null!=req.getBrands_id()&&0!=req.getBrands_id().length){
            req.setBrands_ids(SysUtils.Arry2Str(req.getBrands_id()));
        }
        if(0!=req.getCategory()){
            req.setCategorys(goodService.categorys(req.getCategory()));
        }
        if(null!=req.getPay_channel_id()&&0!=req.getPay_channel_id().length){
            req.setPay_channel_ids(SysUtils.Arry2Str(req.getPay_channel_id()));
        }
        if(null!=req.getPay_card_id()&&0!=req.getPay_card_id().length){
            req.setPay_card_ids(SysUtils.Arry2Str(req.getPay_card_id()));
        }
        if(null!=req.getTrade_type_id()&&0!=req.getTrade_type_id().length){
            req.setTrade_type_ids(SysUtils.Arry2Str(req.getTrade_type_id()));
        }
        if(null!=req.getSale_slip_id()&&0!=req.getSale_slip_id().length){
            req.setSale_slip_ids(SysUtils.Arry2Str(req.getSale_slip_id()));
        }
        if(null!=req.gettDate()&&0!=req.gettDate().length){
            req.settDates(SysUtils.Arry2Str(req.gettDate()));
        }
        if(null!=req.getKeys()&&!"".equals(req.getKeys().trim())){
            req.setKeys(req.getKeys().trim());
        }else{
            req.setKeys(null);
        }
        return req;
    }
    
    @RequestMapping(value = "goodinfo", method = RequestMethod.POST)
    public Response getGoods(@RequestBody PosReq posreq){
        Response response = new Response();
        response.setCode(Response.ERROR_CODE);
        if(posreq.getGoodId()>0){
            Map<String, Object> goodInfoMap;
            try {
                goodInfoMap = goodService.getGoods(posreq);
                response.setCode(Response.SUCCESS_CODE);
                response.setResult(goodInfoMap);
            } catch (Exception e) {
                e.printStackTrace();
                return response;
            }
        }
        return response;
    }
    
    @RequestMapping(value = "goodshow", method = RequestMethod.POST)
    public Response goodshow(@RequestBody PosReq posreq){
        Response response = new Response();
        response.setCode(Response.ERROR_CODE);
        Map<String, Object> goodInfoMap;
        try {
            goodInfoMap = goodService.goodshow(posreq);
            response.setCode(Response.SUCCESS_CODE);
            response.setResult(goodInfoMap);
        } catch (Exception e) {
            e.printStackTrace();
            return response;
        }
        return response;
    }
    
    @RequestMapping(value = "search", method = RequestMethod.POST)
    public Response getSearchCondition(@RequestBody PosReq posreq){
        Response response = new Response();
        Map<String,Object> searchMap= goodService.getSearchCondition(posreq);
        response.setCode(Response.SUCCESS_CODE);
        response.setResult(searchMap);
        return response;
    }
    
    @RequestMapping(value = "getGoodImgUrl", method = RequestMethod.POST)
    public Response getGoodImgUrl(@RequestBody Map<String, Object> map){
    	Response response = new Response();
    	List<Map<String, Object>> temp=goodService.getGoodImgUrl(Integer.parseInt(map.get("goodId").toString()));
    	if(null==temp || temp.size()<1){
    		response.setCode(Response.ERROR_CODE);
    		response.setMessage("该商品不存在图片文件！");
    	}else{
    		response.setResult(temp);
    		response.setCode(Response.SUCCESS_CODE);
    	}
    	return response;
        
    }
    
    @RequestMapping(value = "value", method = RequestMethod.POST)
    public Response value(@RequestBody PosReq posreq){
        List<String> values;
        try {
            values = goodService.getValue(posreq);
            return Response.getSuccess(values);
        } catch (Exception e) {
            return Response.getError("系统异常");
        }
        
    }
}
