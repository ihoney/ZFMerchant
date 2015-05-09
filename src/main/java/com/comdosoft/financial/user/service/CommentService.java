package com.comdosoft.financial.user.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.comdosoft.financial.user.domain.query.CommentReq;
import com.comdosoft.financial.user.mapper.zhangfu.CommentMapper;
import com.comdosoft.financial.user.utils.SysUtils;



@Service
public class CommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Value("${uploadPictureTempsPath}")
    private String uploadPictureTempsPath;

    @Value("${downloadAdminFileModelTemplatePath}")
    private String downloadAdminFileModelTemplatePath;
    
    @Value("${pictureHZList}")
  	private  String pictureHZList;

    private static final String managerTemplateFileName = "java.txt";

    public Map<String, Object> getList(CommentReq req) {
        Map<String, Object> map = new HashMap<String, Object>();
        int total = commentMapper.getCommentCount(req.getGoodId());
        List<Map<String, Object>> list = commentMapper.getCommentList(req);
        map.put("total", total);
        map.put("list", list);
        return map;
    }

    /**
     * 图片上传
     * 
     * @param img
     * @param request
     * @return
     * @throws IOException
     */
    public String saveTmpImage(String uploadFilePath,MultipartFile img, HttpServletRequest request) throws IOException {
        // 保存上传的实体文件
       // String uploadFilePath = uploadPictureTempsPath;
        String fileNamePath = SysUtils.getUploadFileName(request, img, uploadFilePath);
        return fileNamePath;
    }
    

    /**
     * 下载模板文件
     * 
     * @param request
     * @param response
     * @param id
     */
    public void downLoadManagerTemplate(HttpServletRequest request, HttpServletResponse response,Map<Object, Object> map) {
        OutputStream os = null;
        InputStream inputStream = null;
        try {
            // 获取文件的真实磁盘路径
            String realPath = request.getServletContext().getRealPath(downloadAdminFileModelTemplatePath);
            // 实体文件名
            //String fileName = (String)map.get("modelPath");
            String fileName = managerTemplateFileName;
            
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
    
    //校验上传图片格式是否满足
    public  Boolean typeIsCommit(String houzuiStr){
    	return pictureHZList.contains(houzuiStr);
    	}

}
