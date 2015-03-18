package com.comdosoft.financial.user.controller.api;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
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
    
    @Value("${downloadAdminFileModelTemplatePath}")
    private String downloadAdminFileModelTemplatePath;
    

    @RequestMapping(value = "list", method = RequestMethod.POST)
    public Response getGoodsList(@RequestBody  CommentReq req){
        Response response = new Response();
        Map<String,Object> pcInfo= commentService.getList(req);
        response.setCode(Response.SUCCESS_CODE);
        response.setResult(pcInfo);
        return response;
    }
    
    /**
     * 上传文件
     * 
     * @param request
     * @param response
     * @param id
     */
    @RequestMapping(value = "upload/tempImage", method = RequestMethod.POST)
    public Response tempImage(@RequestParam(value="img") MultipartFile img, HttpServletRequest request) {
        try {
        	return Response.getSuccess(commentService.saveTmpImage(img, request));
        } catch (IOException e) {
        	return Response.getError("请求失败！");
        }
    }
    
    /**
     * 下载模板文件
     * 
     * @param request
     * @param response
     * @param id
     */
    /*@RequestMapping(value = "downLoadManagerTemplate", method = RequestMethod.POST)
    public Response downLoadManagerTemplate(@RequestBody  Map<Object, Object> map,
    		HttpServletRequest request, HttpServletResponse response) {
        try {
        	  commentService.downLoadManagerTemplate(request,response,map);
        	  return Response.getSuccess();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.getError("下载模板失败！");
        } finally {
        }
    }*/
    
    /**
     * 下载模板文件
     * 
     * @param request
     * @param response
     * @param id
     */
    @RequestMapping(value = "downLoadManagerTemplate", method = RequestMethod.POST)
    public void downLoadManagerTemplate(HttpServletRequest request, HttpServletResponse response,
    		@RequestBody Map<Object, Object> map) {
        OutputStream os = null;
        InputStream inputStream = null;
        try {
            // 获取文件的真实磁盘路径
            String realPath = request.getServletContext().getRealPath(downloadAdminFileModelTemplatePath);
            // 实体文件名
            String fileName = (String)map.get("modelPath");
            System.out.println("文件名字"+fileName);
            // 解决中文文件名获取不到，乱码，空格等问题
            String attachFileName = new String(StringUtils.replace(fileName, " ", "+").getBytes("UTF-8"), "ISO8859-1");

            response.reset();
            response.setContentType("application/octet-stream");
            response.setHeader("Connection", "close");
            response.setCharacterEncoding("UTF-8");
            response.setHeader("Content-Disposition", "attachment;fileName=" + attachFileName);

            File file = new File(realPath, fileName);
            System.out.println(file);
            inputStream = new FileInputStream(file);
            os = response.getOutputStream();
            byte[] bytes = new byte[1024];
            int length;
            while ((length = inputStream.read(bytes)) > 0) {
                os.write(bytes, 0, length);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) {
                    os = null;
                }
            }
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e1) {
                    inputStream = null;
                }
            }
        }
    }
    
}
