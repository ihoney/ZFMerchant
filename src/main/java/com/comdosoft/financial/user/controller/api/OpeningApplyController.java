package com.comdosoft.financial.user.controller.api;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
	@RequestMapping(value = "getApplyList", method = RequestMethod.POST)
	public Response getApplyList(@RequestBody Map<String, Object> map) {
		try {
			// PageRequest PageRequest = new PageRequest(page,
			// Constants.PAGE_SIZE);
			PageRequest PageRequest = new PageRequest((Integer)(map.get("indexPage")),
					(Integer)map.get("pageNum"));

			int offSetPage = PageRequest.getOffset();
			return Response.getSuccess(openingApplyService.getApplyList(
					((Integer)map.get("customersId")),
					offSetPage, 
					((Integer)map.get("pageNum"))));
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("获取列表失败！");
		}
	}

	/**
	 * 进入申请开通
	 * 
	 * @param id
	 */
	@RequestMapping(value = "getApplyDetails", method = RequestMethod.POST)
	public Response getApplyDetails(@RequestBody Map<String, Object> maps) {
		try {
			Map<Object, Object> map = new HashMap<Object, Object>();
			// 获得终端详情
			map.put("applyDetails",
					openingApplyService.getApplyDetails((Integer)maps.get("terminalsId")));
			// 获得所有商户
			map.put("merchants", openingApplyService.getMerchants((Integer)maps.get("customerId")));
			// 数据回显(针对重新开通申请)
			map.put("applyFor", openingApplyService.ReApplyFor((Integer)maps.get("terminalsId")));
			// 材料名称
			map.put("materialName",
					openingApplyService.getMaterialName((Integer)maps.get("terminalsId"),
					(Integer)maps.get("status")));
			// 获得已有申请开通基本信息
			map.put("openingInfos",
					openingApplyService.getOppinfo((Integer)maps.get("terminalsId"),
					(Integer)maps.get("status")));
			
			return Response.getSuccess(map);
		} catch (Exception e) {
			return Response.getError("请求失败！");
		}
	}

	/**
	 * 根据商户id获得商户详细信息
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "getMerchant", method = RequestMethod.POST)
	public Response getMerchant(@RequestBody Map<String, Object> map) {
		try {
			Map<String, String> merchant = new HashMap<String, String>();
			merchant = openingApplyService.getMerchant((Integer)map.get("merchantId"));
			return Response.getSuccess(merchant);
		} catch (Exception e) {
			return Response.getError("请求失败！");
		}

	}

	/**
	 * 获得所有通道
	 */
	@RequestMapping(value = "getChannels", method = RequestMethod.POST)
	public Response getChannels() {
		try {
			return Response.getSuccess(openingApplyService.getChannels());
		} catch (Exception e) {
			return Response.getError("请求失败！");
		}
	}

	/**
	 * 从第三方接口获得银行
	 */
	@RequestMapping(value = "ChooseBank", method = RequestMethod.POST)
	public Response ChooseBank() {
		try {
			Map<String, String> map = new HashMap<String, String>();
			map.put("code1", "中国农业银行");
			map.put("code2", "中国工商银行");
			return Response.getSuccess(map);
		} catch (Exception e) {
			return Response.getError("请求失败！");
		}
	}

	/**
	 * 对公对私材料名称(0 对公， 1对私)
	 * 
	 * @param id
	 * @param status
	 * @return
	 */
	@RequestMapping(value = "getMaterialName", method = RequestMethod.POST)
	public Response getMaterialName(@RequestBody Map<String, Object> map) {
		try {
			return Response.getSuccess(openingApplyService.getMaterialName(
					(Integer)map.get("terminalId")
					, (Integer)map.get("status")));
		} catch (Exception e) {
			return Response.getError("请求失败！");
		}
	}

	/**
	 * 添加申请信息
	 * 
	 * @param paramMap
	 */
	@RequestMapping(value = "addOpeningApply", method = RequestMethod.POST)
	public Response addOpeningApply(@RequestBody List<Map<String, Object>> paramMap) {
		try {
			OpeningApplie openingApplie = new OpeningApplie();
			Integer status = null;
			String openingAppliesId = null;
			Integer terminalId = null;
			String key = null;
			Object value = null;
			Integer types = null;
			Integer openingRequirementId = null;
			Integer targetId =null;
			int i = 0;
			int y = 0;
			for (Map<String, Object> map : paramMap) {
				Set<String> keys = map.keySet();
				if (y == 0) {
					//判断该商户是否存在
					int count =  openingApplyService.getMerchantsIsNo((String) map.get("cardId"));
					if(count == 0){
						//添加商户
						Merchant merchant = new Merchant();
						merchant.setLegalPersonName((String) map
								.get("name"));
						merchant.setLegalPersonCardId((String) map
								.get("cardId"));
						merchant.setTitle((String) map
								.get("merchantName"));
						merchant.setTaxRegisteredNo((String) map
								.get("registeredNo"));
						merchant.setOrganizationCodeNo((String) map
								.get("organizationNo"));
						merchant.setAccountBankNum((String) map
								.get("bankNum"));
						merchant.setCustomerId((Integer) map
								.get("customersId"));
						openingApplyService.addMerchan(merchant);
						//获得添加后商户Id
						map.put("merchantId", merchant.getId());
					}else if(count > 0){
						status = (Integer) map.get("status");
						terminalId = (Integer)map.get("terminalId");
						if (status == 2) {
							openingAppliesId = String.valueOf(openingApplyService
									.getApplyesId(terminalId));
							// 删除旧数据
							openingApplyService.deleteOpeningInfos(Integer
									.valueOf(openingAppliesId));
						} else {
							openingApplie.setTerminalId((Integer) map
									.get("terminalId"));
							openingApplie.setApplyCustomerId((Integer) map
									.get("applyCustomerId"));
							openingApplie.setStatus((Integer) map
									.get("status"));
							openingApplie.setTypes((Integer) map
									.get("publicPrivateStatus"));
							openingApplie.setMerchantId((Integer) map
									.get("merchantId"));
							openingApplie.setMerchantName((String) map
									.get("merchantName"));
							openingApplie.setSex((Integer) map
									.get("sex"));
							openingApplie.setBirthday( new SimpleDateFormat("yyyy/MM/dd").parse((String) map.get("birthday")));
							openingApplie.setCardId((String) map
									.get("cardId"));
							openingApplie.setPhone((String) map
									.get("phone"));
							openingApplie.setEmail((String) map
									.get("email"));
							openingApplie.setCityId((Integer) map
									.get("cityId"));
							openingApplie.setName((String) map
									.get("name"));
							openingApplie.setPayChannelId((Integer) map
									.get("channel"));
							openingApplie.setAccountBankNum((String) map
									.get("bankNum"));
							openingApplie.setAccountBankName((String) map
									.get("bankName"));
							openingApplie.setAccountBankCode((String) map
									.get("bankCode"));
							openingApplie.setTaxRegisteredNo((String) map
									.get("organizationNo"));
							openingApplie.setOrganizationCodeNo((String) map
									.get("registeredNo"));
							openingApplyService.addOpeningApply(openingApplie);
							openingAppliesId = String
									.valueOf(openingApplie.getId());
						}
					}
				} else {
					for (String str : keys) {
						if (i == 0)
							key = (String) map.get(str);
						if (i == 1)
							value =  map.get(str);
						if (i == 2)
							types = (Integer) map.get(str);
						if (i == 3)
							openingRequirementId = (Integer) map.get(str);
						if (i == 4)
							targetId = Integer.parseInt((String) map.get(str));
						i++;
					}
					openingApplyService.addApply(key, value,types, openingAppliesId,openingRequirementId,targetId);
					i = 0;
				}
				y++;
			}
			return Response.getSuccess("添加成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}

	/**
	 * 视频认证
	 */
	@RequestMapping(value = "videoAuthentication", method = RequestMethod.POST)
	public Response videoAuthentication() {
		try {
			return Response.getSuccess("视频认证");
		} catch (Exception e) {
			return Response.getError("视频认证异常");
		}
	}
}
