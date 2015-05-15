package com.comdosoft.financial.user.controller.api;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.service.IndexService;
import com.comdosoft.financial.user.utils.HttpFile;
import com.comdosoft.financial.user.utils.SysUtils;

@RestController
@RequestMapping("api/index")
public class IndexController {

	public static final Logger logger = LoggerFactory.getLogger(IndexController.class);
    @Autowired
    private IndexService indexService ;
    
    @Value("${userMerchant}")
    private String userMerchant;
    
    @Value("${filePath}")
    private String filePath;

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
    @RequestMapping(value = "getCity")
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
    
    //更新手机号  根据用户id查询，更新 新手机号
    @RequestMapping(value = "change_email", method = RequestMethod.POST)
    public Response change_email(@RequestBody MyOrderReq req,HttpServletRequest request){
        indexService.change_email(request,req);
        return Response.getSuccess();
    }
    
    //手机端用 修改邮箱 返回验证码
    @RequestMapping(value = "updateEmail", method = RequestMethod.POST)
    public Response update_email(@RequestBody MyOrderReq req,HttpServletRequest request){
    	String c = indexService.update_email(req);
    	if(c == ""){
    		return Response.getError("发送失败，请重新再试");
    	}
    	return Response.buildSuccess(c, "success");
    }
    
    //跳转页面修改邮箱
    @RequestMapping(value = "to_change_email/{id}/{name}/{str}")
    public void to_change_email(@PathVariable String id,@PathVariable String name, @PathVariable String str,HttpServletRequest request,HttpServletResponse response){
        String data = SysUtils.string2MD5(name+"zf_vc");
        String   url  = request.getScheme()+"://";  
        url+=request.getHeader("host");   
        url+=request.getContextPath();  
        if(data.equals(str)){
            try {
//                Cookie cookie_name = new Cookie("loginUserName",name);   
//                Cookie cookie_id = new Cookie("loginUserId",id);    
//                cookie_name.setMaxAge(Integer.MAX_VALUE);           
//                cookie_id.setMaxAge(Integer.MAX_VALUE);           
//                response.addCookie(cookie_id);                    
//                response.addCookie(cookie_name);                     
                response.sendRedirect(url+"/#/email_up");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else{
            try {
                response.sendRedirect(url+"/#");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    //文件上传 返回上传后的地址
    @RequestMapping(value = "upload", method = RequestMethod.POST)
    public Response upload(@RequestParam("file") MultipartFile file,HttpServletRequest request){
    	String result=HttpFile.upload(file, userMerchant);
    	result = filePath + result;
        if(result.split("/").length>1){
            return Response.getSuccess(result);
        }else{
            return Response.getError(result);
        }
    }
    
    //文件上传 返回上传后的地址
    @RequestMapping(value = "fileupload", method = RequestMethod.POST)
    public String webupload(@RequestParam("file") MultipartFile file,HttpServletRequest request){
    	logger.debug(" web start upload "+ file);
    	String result ;
    	try{
    		 result=HttpFile.upload(file, userMerchant);
    		 result = filePath + result;
    	}catch(Exception e){
    		result = "-1";
    	}
        logger.debug(" web start upload "+ file+" >>result>>"+result);
        return result;
    }
    
    
}
