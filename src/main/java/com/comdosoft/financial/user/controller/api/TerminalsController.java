package com.comdosoft.financial.user.controller.api;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.zhangfu.City;
import com.comdosoft.financial.user.domain.zhangfu.CsCancel;
import com.comdosoft.financial.user.domain.zhangfu.CsReceiverAddress;
import com.comdosoft.financial.user.domain.zhangfu.CustomerAddress;
import com.comdosoft.financial.user.domain.zhangfu.Merchant;
import com.comdosoft.financial.user.domain.zhangfu.OpeningApplie;
import com.comdosoft.financial.user.domain.zhangfu.Terminal;
import com.comdosoft.financial.user.service.OpeningApplyService;
import com.comdosoft.financial.user.service.TerminalsService;
import com.comdosoft.financial.user.utils.SysUtils;
import com.comdosoft.financial.user.utils.page.PageRequest;


/**
 * 
 * 终端管理<br>
 * <功能描述>
 *
 * @author xfh 2015年2月7日
 *
 */
@RestController
@RequestMapping(value = "/api/terminal")
public class TerminalsController {
	 private static final Logger logger = LoggerFactory.getLogger(WebMessageController.class);
	
	@Resource
	private TerminalsService terminalsService;
	
	@Resource
	private OpeningApplyService openingApplyService;

	@Value("${passPath}")
	private String passPath;

	/**
	 * 根据用户ID获得终端列表
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "getApplyList", method = RequestMethod.POST)
	public Response getApplyList(@RequestBody Map<String, Object> map) {
		try {
			Map<Object, Object> maps = new HashMap<Object, Object>();
			PageRequest PageRequest = new PageRequest((Integer)map.get("indexPage"),
					(Integer)map.get("pageNum"));
			int offSetPage = PageRequest.getOffset();
			
			
			maps.put("indexPage", (Integer)map.get("indexPage"));
			maps.put("pageNum", (Integer)map.get("pageNum"));
			maps.put("totalSize", terminalsService.getTerminalListNums(
					((Integer)map.get("customersId")),
					offSetPage,
					(Integer)map.get("pageNum"),
					(Integer)map.get("frontStatus"),
					(String)map.get("serialNum")));
			//终端付款状态（2 已付   1未付  3已付定金）
			maps.put("frontPayStatus", terminalsService.getFrontPayStatus());
			//通道
			maps.put("channels", terminalsService.getChannels());
			maps.put("list", terminalsService.getTerminalList(
					((Integer)map.get("customersId")),
					offSetPage,
					(Integer)map.get("pageNum"),
					(Integer)map.get("frontStatus"),
					(String)map.get("serialNum")));
			return Response.getSuccess(maps);
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 收单通道
	 */
	@RequestMapping(value = "getFactories", method = RequestMethod.POST)
	public Response getFactories() {
		try {
			return Response.getSuccess(terminalsService.getChannels());
		} catch (Exception e) {
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 添加终端
	 * 
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "addTerminal", method = RequestMethod.POST)
	public Response addTerminal(@RequestBody Map<String, String> map) {
		try {
			Merchant merchants = new Merchant();
			// 判断该终端号是否存在
			if (terminalsService.isExistence(map.get("serialNum")) > 0) {
				return Response.getError("终端号已存在！");
			} else if (terminalsService.isMerchantName(map.get("title")) > 0) {
				return Response.getError("商户名已存在！");
			} else {
				merchants.setTitle(map.get("title"));
				merchants.setCustomerId(Integer.parseInt(map.get("customerId")));
				// 添加商户
				terminalsService.addMerchants(merchants);
				// 添加终端
				map.put("merchantId", merchants.getId().toString());
				map.put("status", String.valueOf(Terminal.TerminalTYPEID_3));
				map.put("isReturnCsDepots", String.valueOf(Terminal.IS_RETURN_CS_DEPOTS_NO));
				map.put("type", String.valueOf(Terminal.SYSTYPE));
				map.put("payChannelId", map.get("payChannelId"));
				terminalsService.addTerminal(map);
				return Response.getSuccess("添加成功！");
			}
		} catch (Exception e) {
			  logger.debug("添加终端 "+e);
			return Response.getError("请求失败");
		}

	}
	
	/**
	 * 找回POS机密码
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "Encryption", method = RequestMethod.POST)
	public Response Encryption(@RequestBody Map<String, Object> map) {
		try {
			String pass = SysUtils.Decrypt(
					terminalsService.findPassword(Integer.parseInt((String)map.get("terminalid"))),passPath);
			return Response.getSuccess(pass);
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败!");
		}
	}
	
	/**
	 * 视频认证
	 */
	@RequestMapping(value = "videoAuthentication", method = RequestMethod.POST)
	public Response videoAuthentication() {
		try {
			return Response.getSuccess("认证成功！");
		} catch (Exception e) {
			return Response.getError("认证失败！");
		}
	}
	
	/**
	 * 同步
	 */
	@RequestMapping(value = "synchronous", method = RequestMethod.POST)
	public Response Synchronous() {
		try {
			return Response.getSuccess("同步成功！");
		} catch (Exception e) {
			return Response.getError("同步失败！");
		}
	}

	/**
	 * 进入终端详情
	 * 
	 * @param id
	 */
	@RequestMapping(value = "getApplyDetails", method = RequestMethod.POST)
	public Response getApplyDetails(@RequestBody Map<Object, Object> maps) {
		try {
			Map<Object, Object> map = new HashMap<Object, Object>();
			// 获得终端详情
			map.put("applyDetails",
					terminalsService.getApplyDetails((Integer)maps.get("terminalsId")));
			// 终端交易类型
			map.put("rates", terminalsService.getRate((Integer)maps.get("terminalsId")));
			//获得租赁信息
			map.put("tenancy", terminalsService.getTenancy((Integer)maps.get("terminalsId")));
			// 追踪记录
			map.put("trackRecord", terminalsService.getTrackRecord((Integer)maps.get("terminalsId")));
			// 开通详情
			map.put("openingDetails",
					terminalsService.getOpeningDetails((Integer)maps.get("terminalsId")));
			//获得模板路径
			map.put("ReModel", terminalsService.getModule((Integer)maps.get("terminalsId"),1));
			//获得用户收货地址
			map.put("address", terminalsService.getCustomerAddress((Integer)maps.get("customerId")));
			//城市级联
			map.put("Cities", terminalsService.getCities());
			return Response.getSuccess(map);
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	
	/**(以下web)
	 * 申请更新资料
	 * 
	 * @param maps
	 */
	@RequestMapping(value = "getApplyToUpdate", method = RequestMethod.POST)
	public Response getApplyToUpdate(@RequestBody Map<Object, Object> maps) {
		try {
			maps.put("templeteInfoXml", maps.get("templeteInfoXml").toString());
			terminalsService.subToUpdate(maps);
			return Response.getSuccess("更新成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 提交退还申请
	 * 
	 * @param maps
	 */
	@RequestMapping(value = "subLeaseReturn", method = RequestMethod.POST)
	public Response subLeaseReturn(@RequestBody Map<Object, Object> maps) {
		try {
			if(Integer.parseInt((String)maps.get("modelStatus")) == 1){
				CsCancel csCancel =new CsCancel();
				csCancel.setTerminalId(Integer.parseInt((String)maps.get("terminalId")));
				csCancel.setStatus((Integer)maps.get("status"));
				csCancel.setTempleteInfoXml((maps.get("templeteInfoXml").toString()));
				csCancel.setTypes((Integer)maps.get("type"));
				csCancel.setCustomerId((Integer)maps.get("customerId"));
				//先注销
				terminalsService.subRentalReturn(csCancel);
				maps.put("csCencelId", csCancel.getId());
			}else{
				maps.put("csCencelId", null);
			}
			//退还
			terminalsService.subLeaseReturn(maps);
			return Response.getSuccess("操作成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 提交退货申请
	 * 
	 * @param maps
	 */
	@RequestMapping(value = "subReturn", method = RequestMethod.POST)
	public Response subReturn(@RequestBody Map<Object, Object> maps) {
		try {
			if(Integer.parseInt((String)maps.get("modelStatus")) == 1){
			CsCancel csCancel =new CsCancel();
			csCancel.setTerminalId(Integer.parseInt((String)maps.get("terminalsId")));
			csCancel.setStatus((Integer)maps.get("status"));
			csCancel.setTempleteInfoXml(maps.get("templeteInfoXml").toString());
			csCancel.setTypes((Integer)maps.get("type"));
			csCancel.setCustomerId((Integer)maps.get("customerId"));
			//先注销
			terminalsService.subRentalReturn(csCancel);
			maps.put("csCencelId", csCancel.getId());
			}else{
				terminalsService.subReturn(maps);
			}
			return Response.getSuccess("操作成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 提交注销
	 * 
	 * @param maps
	 */
	@RequestMapping(value = "subRentalReturn", method = RequestMethod.POST)
	public Response subRentalReturn(@RequestBody Map<Object, Object> maps) {
		try {
			CsCancel csCancel =new CsCancel();
			csCancel.setTerminalId(Integer.parseInt((String)maps.get("terminalId")));
			csCancel.setStatus((Integer)maps.get("status"));
			csCancel.setTempleteInfoXml(maps.get("templeteInfoXml").toString());
			csCancel.setTypes((Integer)maps.get("type"));
			csCancel.setCustomerId((Integer)maps.get("customerId"));
			//先注销
			terminalsService.subRentalReturn(csCancel);
			return Response.getSuccess("操作成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 提交维修申请
	 * 
	 * @param maps
	 */
	@RequestMapping(value = "subRepair", method = RequestMethod.POST)
	public Response subRepair(@RequestBody Map<Object, Object> maps) {
		try {
			CsReceiverAddress csReceiverAddress =new CsReceiverAddress();
			//先添加维修地址表
			csReceiverAddress = terminalsService.subRepairAddress(maps);
			maps.put("receiveAddressId", csReceiverAddress.getId());
			
			terminalsService.subRepair(maps);
			return Response.getSuccess("操作成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 提交换货申请
	 * 
	 * @param maps
	 */
	@RequestMapping(value = "subChange", method = RequestMethod.POST)
	public Response subChange(@RequestBody Map<Object, Object> maps) {
		try {
			if(Integer.parseInt((String)maps.get("modelStatus")) == 1){
				CsCancel csCancel =new CsCancel();
				csCancel.setTerminalId(Integer.parseInt((String)maps.get("terminalsId")));
				csCancel.setStatus((Integer)maps.get("status"));
				csCancel.setTempleteInfoXml((maps.get("templeteInfoXml").toString()));
				csCancel.setTypes((Integer)maps.get("type"));
				csCancel.setCustomerId((Integer)maps.get("customerId"));
				//先注销
				terminalsService.subRentalReturn(csCancel);
				maps.put("csCencelId", csCancel.getId());
			}else{
				maps.put("csCencelId", null);
			}
			
			CsReceiverAddress csReceiverAddress =new CsReceiverAddress();
			//先添加换货地址表
			maps.put("templeteInfoXml", maps.get("templeteInfoXml").toString());
			csReceiverAddress = terminalsService.subRepairAddress(maps);
			
			maps.put("receiveAddressId", csReceiverAddress.getId());
			
			terminalsService.subChange(maps);
			return Response.getSuccess("操作成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	
	/**
	 * 进入申请开通
	 * 
	 * @param id
	 */
	@RequestMapping(value = "getApplyOpenDetails", method = RequestMethod.POST)
	public Response getApplyOpenDetails(@RequestBody Map<String, Integer> maps) {
		try {
			Map<Object, Object> map = new HashMap<Object, Object>();
			// 获得终端详情
			map.put("applyDetails",
					terminalsService.getApplyDetails(maps.get("terminalsId")));
			// 获得所有商户
			map.put("merchants", openingApplyService.getMerchants(maps.get("customerId")));
			// 获得材料等级
			map.put("MaterialLevel", openingApplyService.getMaterialLevel(maps.get("terminalsId")));
			//城市级联
			map.put("Cities", terminalsService.getCities());
			//支付通道
			map.put("channels", terminalsService.getChannels());
			return Response.getSuccess(map);
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}

	/**
	 * author jwb 查询终端开通情况
	 * 
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value = "openStatus", method = RequestMethod.POST)
	public Response openStatus(@RequestBody Map<String, Object> paramMap) {
		try {
			return Response.getSuccess(terminalsService.openStatus(paramMap));
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
			map.put("code3", "美国农业银行");
			map.put("code4", "美国工商银行");
			return Response.getSuccess(map);
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
							targetId =(Integer) map.get(str);
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
	 * 对公对私材料名称(0 对公， 1对私)
	 * 
	 * @param id
	 * @param status
	 * @return
	 */
	@RequestMapping(value = "getMaterialName", method = RequestMethod.POST)
	public Response getMaterialName(@RequestBody Map<String, Integer> map) {
		try {
			return Response.getSuccess(openingApplyService.getMaterialName(
					map.get("terminalId")
					,map.get("status")));
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 *添加联系地址
	 * 
	 * @param id
	 * @param status
	 * @return
	 */
	@RequestMapping(value = "addCostometAddress", method = RequestMethod.POST)
	public Response addCostometAddress(@RequestBody CustomerAddress customerAddress) {
		try {
			customerAddress.setIsDefault(2);
			terminalsService.addCostometAddress(customerAddress);
			return Response.getSuccess("添加成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 *很据省获得市
	 * 
	 * @param id
	 * @param status
	 * @return
	 */
	@RequestMapping(value = "getShiCities", method = RequestMethod.POST)
	public Response getShiCities(@RequestBody City city) {
		try {
			return Response.getSuccess(terminalsService.getShiCities(city.getParentId()));
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
}
