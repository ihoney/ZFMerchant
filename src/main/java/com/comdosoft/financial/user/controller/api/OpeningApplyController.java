package com.comdosoft.financial.user.controller.api;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.zhangfu.Merchant;
import com.comdosoft.financial.user.domain.zhangfu.OpeningApplie;
import com.comdosoft.financial.user.service.OpeningApplyService;
import com.comdosoft.financial.user.utils.page.PageRequest;

/**
 * 
 * 开通申请<br>
 * <功能描述>
 *
 * @author xfh 2015年2月5日
 *
 */
@RestController
@RequestMapping(value = "/api/apply")
public class OpeningApplyController {

	@Resource
	private OpeningApplyService openingApplyService;

	/**
	 * 根据用户ID获得开通申请列表
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "getApplyList/{id}/{indexPage}/{pageNum}", method = RequestMethod.GET)
	public Response getApplyList(@PathVariable("id") Integer id,
			@PathVariable("indexPage") Integer page,@PathVariable("pageNum") Integer pageNum) {
		
		//PageRequest PageRequest = new PageRequest(page, Constants.PAGE_SIZE);
		PageRequest PageRequest = new PageRequest(page, pageNum);
		Response response = new Response();

		int offSetPage = PageRequest.getOffset();
		response.setResult(openingApplyService.getApplyList(id, offSetPage,
				pageNum));
		return response;

	}

	/**
	 * 进入申请开通
	 * 
	 * @param id
	 */
	@RequestMapping(value = "getApplyDetails/{id}/{status}", method = RequestMethod.GET)
	public Response getApplyDetails(@PathVariable("id") Integer id,
			@PathVariable("status") Integer status) {
		Response response = new Response();
		Map<Object, Object> map = new HashMap<Object, Object>();
		// 获得终端详情
		map.put("applyDetails", openingApplyService.getApplyDetails(id));
		// 获得所有商户
		map.put("merchants", openingApplyService.getMerchants());
		// 数据回显(针对重新开通申请)
		map.put("applyFor", openingApplyService.ReApplyFor(id));
		// 材料名称
		map.put("materialName", openingApplyService.getMaterialName(id, status));
		response.setResult(map);
		return response;
	}
	
	/**
	 * 根据商户id获得商户详细信息
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "getMerchant/{id}", method = RequestMethod.GET)
	public Response getMerchant(@PathVariable("id") Integer id) {
		Response response = new Response();
		Merchant merchant = new Merchant();
		merchant = openingApplyService.getMerchant(id);
		response.setResult(merchant);
		return response;
	}
	
	/**
	 * 获得所有通道
	 */
	@RequestMapping(value = "getChannels", method = RequestMethod.GET)
	public Response getChannels(){
		Response response = new Response();
		response.setResult(openingApplyService.getChannels());
		return response;
	}
	
	/**
	 * 从第三方接口获得银行
	 */
	@RequestMapping(value = "ChooseBank", method = RequestMethod.GET)
	public Response ChooseBank(){
		Map<String, String> map = new HashMap<String, String>();
		map.put("code1", "中国农业银行");
		map.put("code2", "中国工商银行");
		Response response = new Response();
		response.setResult(map);
		return response;
	}

	/**
	 * 对公对私材料名称
	 * 
	 * @param id
	 * @param status
	 * @return
	 */
	@RequestMapping(value = "getMaterialName/{id}/{status}", method = RequestMethod.GET)
	public Response getMaterialName(@PathVariable("id") Integer id,
			@PathVariable("status") Integer status) {
		Response response = new Response();
		response.setResult(openingApplyService.getMaterialName(id, status));
		return response;
	}

	/**
	 * 添加申请信息
	 * 
	 * @param paramMap
	 */
	@RequestMapping(value = "addOpeningApply", method = RequestMethod.POST)
	@ResponseBody
	public void addOpeningApply(@RequestBody List<Map<String, Object>> paramMap) {

		OpeningApplie openingApplie = new OpeningApplie();
		String status = null;
		String openingAppliesId = null;
		Integer terminalId = null;
		String key = null;
		String value = null;
		int i = 0;
		int y = 0;
		for (Map<String, Object> map : paramMap) {
			Set<String> keys = map.keySet();
			if (y == 0) {
				status = (String) map.get("status");
				terminalId = (Integer) map.get("terminalId");
				if ("重新申请".equals(status)) {
					openingAppliesId = String.valueOf(openingApplyService
							.getApplyesId(terminalId));
					// 删除旧数据
					openingApplyService.deleteOpeningInfos(Integer
							.valueOf(openingAppliesId));
				} else {
					openingApplie
							.setTerminalId((Integer) map.get("terminalId"));
					openingApplie.setApplyCustomerId((Integer) map
							.get("applyCustomerId"));
					openingApplie.setPreliminaryVerifyUserId((Integer) map
							.get("preliminaryVerifyUserId"));
					openingApplie.setOpeningApplyMarkId((Integer) map
							.get("openingApplyMarkId"));
					openingApplyService.addOpeningApply(openingApplie);
					openingAppliesId = String.valueOf(openingApplie.getId());
				}
			} else {
				for (String str : keys) {
					if (i == 0)
						key = (String) map.get(str);
					if (i == 1)
						value = (String) map.get(str);
					i++;
				}
				openingApplyService.addApply(key, value, openingAppliesId);
				i = 0;
			}
			y++;
		}
	}

	/**
	 * 材料图片上传
	 * 
	 * @param filePath
	 * @return
	 */
	@RequestMapping(value = "uploadFile", method = RequestMethod.POST)
	@ResponseBody
	public Response uploadFile(@RequestBody Map<String, String> map,
			HttpServletRequest request) {
		String filePath = null;
		Set<String> keys = map.keySet();
		for (String str : keys) {
			filePath = map.get(str);
		}
		Response response = new Response();
		String fileOutPath = request.getServletContext().getRealPath("/")
				+ "WEB-INF/temp/";
		int byteread = 0;// 读取的位数
		FileInputStream in = null;
		FileOutputStream out = null;
		File fileIn = new File(filePath);
		File fileOut = new File(fileOutPath);

		if (!fileOut.exists()) {
			fileOut.mkdirs();
		}
		fileOut = new File(fileOutPath
				+ filePath.substring(filePath.lastIndexOf("\\") + 1));
		if (!fileIn.exists()) {
			response.setMessage("该路径图片不存在！");
			return response;
		}
		try {
			in = new FileInputStream(fileIn);
			out = new FileOutputStream(fileOut);
			byte[] buffer = new byte[1024];
			while ((byteread = in.read(buffer)) != -1) {
				// 将读取的字节写入输出流
				out.write(buffer, 0, byteread);
			}
			response.setMessage("上传成功！");
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			response.setMessage("上传失败！");
			return response;
		} finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 视频认证
	 */
	@RequestMapping(value = "videoAuthentication", method = RequestMethod.GET)
	public Response videoAuthentication(){
		Response response = new Response();
		return response;
	}
	
}
