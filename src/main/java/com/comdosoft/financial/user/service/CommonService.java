package com.comdosoft.financial.user.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.comdosoft.financial.user.utils.SysUtils;

/**
 * 公共服务类<br>
 * <功能描述>
 *
 * @author Java-007 2015年3月9日
 *
 */
@Service
public class CommonService {

    /**
     * 文件上传
     * 
     * @param request
     * @param file
     * @param uploadFilePath
     * @return
     * @throws IOException
     */
    public String saveTmpImage(HttpServletRequest request, MultipartFile file, String uploadFilePath) throws IOException {
        return SysUtils.getUploadFileName(request, file, uploadFilePath);
    }

}