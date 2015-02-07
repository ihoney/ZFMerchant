package com.comdosoft.financial.user.controller.api;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.zhangfu.Merchant;
import com.comdosoft.financial.user.service.OpeningApplyService;
import com.comdosoft.financial.user.service.TerminalsService;
import com.comdosoft.financial.user.utils.Constants;
import com.comdosoft.financial.user.utils.SysUtils;
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
@RequestMapping(value = "terminal")
public class TerminalsController {

	@Resource
	private OpeningApplyService openingApplyService;

	@Resource
	private TerminalsService terminalsService;

	/*@Value("${passPath}")
	private String passPath;*/

	/**
	 * 根据用户ID获得终端列表
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "terminalList/{id}/{indexPage}", method = RequestMethod.GET)
	public Response getApplyList(@PathVariable("id") Integer id,
			@PathVariable("indexPage") Integer page) {

		PageRequest PageRequest = new PageRequest(page, Constants.PAGE_SIZE);
		Response response = new Response();

		int offSetPage = PageRequest.getOffset();
		response.setResult(terminalsService.getTerminalList(id, offSetPage,
				Constants.PAGE_SIZE));
		return response;

	}

	/**
	 * 进入终端详情
	 * 
	 * @param id
	 */
	@RequestMapping(value = "applyDetails/{id}", method = RequestMethod.GET)
	public Response getApplyDetails(@PathVariable("id") Integer id) {
		Response response = new Response();
		Map<Object, Object> map = new HashMap<Object, Object>();
		// 获得终端详情
		map.put("applyDetails", terminalsService.getApplyDetails(id));
		// 终端交易类型
		map.put("rates", terminalsService.getRate(id));
		// 追踪记录
		map.put("trackRecord", terminalsService.getTrackRecord(id));
		// 开通详情
		map.put("openingDetails", terminalsService.getOpeningDetails(id));
		response.setResult(map);
		return response;
	}

	/**
	 * 收单机构
	 */
	@RequestMapping(value = "Factories", method = RequestMethod.GET)
	public void getFactories() {
		Response response = new Response();
		response.setResult(terminalsService.getChannels());
	}

	/**
	 * 添加终端
	 * 
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "Factories", method = RequestMethod.POST)
	public Response addTerminal(@RequestBody Map<String, String> map) {
		Response response = new Response();
		Merchant merchants = new Merchant();
		// 判断该终端号是否存在
		if (terminalsService.isExistence(map.get("serialNum")) > 0) {
			response.setMessage("终端号已存在！");
			return response;
		} else if (terminalsService.isMerchantName(map.get("title")) > 0) {
			response.setMessage("商户名已存在！");
			return response;
		} else {
			merchants.setTitle(map.get("title"));
			merchants.setCustomerId(map.get("customerId"));
			// 添加商户
			terminalsService.addMerchants(merchants);
			// 添加终端
			map.put("merchantId", merchants.getId().toString());
			terminalsService.addTerminal(map);
			response.setMessage("添加成功！");
			return response;
		}
	}

	/**
	 * 解密
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "findPassword/{id}", method = RequestMethod.GET)
	public Response Encryption(@PathVariable("id") Integer id) {
		Response response = new Response();
		SysUtils sysUtils = new SysUtils();
			try {
				String pass = sysUtils.Decrypt(terminalsService.findPassword(id), "C:/Program Files (x86)/password.txt");
				response.setResult(pass);
				response.setMessage("找回密码成功！");
			} catch (Exception e) {
				e.printStackTrace();
				response.setMessage("找回密码失败！");
			}
		return response;
	}

}
