package com.comdosoft.financial.user.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Calendar;
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

@Service
public class CommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Value("${uploadPictureTempsPath}")
    private String uploadPictureTempsPath;

    @Value("${downloadAdminFileModelTemplatePath}")
    private String downloadAdminFileModelTemplatePath;

    //private static final String managerTemplateFileName = "管理员导入模板.xls";

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
    public String saveTmpImage(MultipartFile img, HttpServletRequest request) throws IOException {
        String fileName = Calendar.getInstance().getTimeInMillis() + ".jpg";
        // String realPath = dirRoot + imgTempPath;
        String realPath = request.getServletContext().getRealPath(uploadPictureTempsPath);
        File dir = new File(realPath);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        InputStream stream = img.getInputStream();
        // Thumbnails.of(stream).size(480, 480).toFile(realPath + File.separator + fileName);
        stream.close();
        return uploadPictureTempsPath + fileName;
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
