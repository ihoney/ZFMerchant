package com.comdosoft.financial.user.controller.api;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.CommentReq;
import com.comdosoft.financial.user.service.CommentService;

@RestController
@RequestMapping("api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService ;
    

    @RequestMapping(value = "list", method = RequestMethod.POST)
    public Response getGoodsList(@RequestBody  CommentReq req){
        Response response = new Response();
        Map<String,Object> pcInfo= commentService.getList(req);
        response.setCode(Response.SUCCESS_CODE);
        response.setResult(pcInfo);
        return response;
    }
    
    
    @RequestMapping(value = "upload/tempImage", method = RequestMethod.POST)
    public Response tempImage(@RequestParam(value="img") MultipartFile img, HttpServletRequest request) {
        Response response = new Response();
        try {
            response.setResult(commentService.saveTmpImage(img, request));
        } catch (IOException e) {
        	response.setResult("error");
        }
        return response;
    }
    
    /**
     * 下载模板文件
     * 
     * @param request
     * @param response
     * @param id
     */
    @RequestMapping(value = "downLoadManagerTemplate", method = RequestMethod.POST)
    public void downLoadManagerTemplate(@RequestBody  Map<Object, Object> map,
    		HttpServletRequest request, HttpServletResponse response) {
        try {
        	 commentService.downLoadManagerTemplate(request,response);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
        }
    }
    
}
