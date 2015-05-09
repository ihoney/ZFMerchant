package com.comdosoft.financial.user.controller.api;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.zhangfu.City;
import com.comdosoft.financial.user.domain.zhangfu.CsCancel;
import com.comdosoft.financial.user.domain.zhangfu.CsChange;
import com.comdosoft.financial.user.domain.zhangfu.CsLeaseReturn;
import com.comdosoft.financial.user.domain.zhangfu.CsReceiverAddress;
import com.comdosoft.financial.user.domain.zhangfu.CsRepair;
import com.comdosoft.financial.user.domain.zhangfu.CsUpdateInfo;
import com.comdosoft.financial.user.domain.zhangfu.CustomerAddress;
import com.comdosoft.financial.user.domain.zhangfu.Merchant;
import com.comdosoft.financial.user.domain.zhangfu.OpeningApplie;
import com.comdosoft.financial.user.domain.zhangfu.Terminal;
import com.comdosoft.financial.user.service.CommentService;
import com.comdosoft.financial.user.service.OpeningApplyService;
import com.comdosoft.financial.user.service.TerminalsService;
import com.comdosoft.financial.user.utils.CommonServiceUtil;
import com.comdosoft.financial.user.utils.HttpFile;
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
	
	@Autowired
    private CommentService commentService;
	
	@Resource
	private OpeningApplyService openingApplyService;

	@Value("${passPath}")
	private String passPath;
	
	@Value("${userTerminal}")
	private String userTerminal;
	
	@Value("${filePath}")
	private String filePath;
	
	@Value("${sysFileTerminal}")
	private String sysFileTerminal;
	
	@Value("${syncStatus}")
	private String syncStatus;
	
	@Value("${timingPath}")
	private String timingPath;
	
	@Value("${bankList}")
	private String bankList;
	 

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
			PageRequest PageRequest = new PageRequest((Integer)map.get("page"),
					(Integer)map.get("rows"));
			int offSetPage = PageRequest.getOffset();
			
			maps.put("total", terminalsService.getTerminalListNums(
					((Integer)map.get("customersId")),
					offSetPage,
					(Integer)map.get("rows"),
					(Integer)map.get("frontStatus"),
					(String)map.get("serialNum")));
			//终端付款状态（2 已付   1未付  3已付定金）
			maps.put("frontPayStatus", terminalsService.getFrontPayStatus());
			//支付通道和周期列表
			List<Map<Object, Object>> list = terminalsService.getChannels();
			 for(Map<Object, Object> m:list){
				 m.put("billings", terminalsService.channelsT(Integer.parseInt(m.get("id").toString())));
			 }
			maps.put("channels",list);
			List<Map<Object, Object>> li = terminalsService.getTerminalList(
					((Integer)map.get("customersId")),
					offSetPage,
					(Integer)map.get("rows"),
					(Integer)map.get("frontStatus"),
					(String)map.get("serialNum"));
			maps.put("list", li == null?new ArrayList<Object>():li);
			return Response.getSuccess(maps);
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 获取协议内容
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "getOpeningProtocol", method = RequestMethod.POST)
	public Response getOpeningProtocol(@RequestBody Map<String, Object> map){
		int terminalId=Integer.parseInt(map.get("id").toString());
		String openingProtocol= terminalsService.getOpeningProtocol(terminalId);
		return Response.getSuccess(openingProtocol);
	}
	
	/**
	 * 收单通道
	 */
	@RequestMapping(value = "getFactories", method = RequestMethod.POST)
	public Response getFactories() {
		try {
			//支付通道和周期列表
			List<Map<Object, Object>> list = terminalsService.getChannels();
			 for(Map<Object, Object> m:list){
				 m.put("billings", terminalsService.channelsT(Integer.parseInt(m.get("id").toString())));
			 }
			return Response.getSuccess(list);
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
			
			Map<Object, Object> merId = terminalsService.isMerchantName(map.get("title"));
			if (terminalsService.isExistence(map.get("serialNum")) > 0) {
				return Response.getError("终端号已存在！");
			} else {
				if (merId == null) {
					merchants.setTitle(map.get("title"));
					merchants.setCustomerId(Integer.parseInt(map.get("customerId")));
					// 添加商户
					terminalsService.addMerchants(merchants);
				} else{
					merchants.setId((Integer)merId.get("id"));
				} 
				// 添加终端
				map.put("merchantId", merchants.getId().toString());
				map.put("status", String.valueOf(Terminal.TerminalTYPEID_1));
				map.put("isReturnCsDepots", String.valueOf(Terminal.IS_RETURN_CS_DEPOTS_NO));
				map.put("type", String.valueOf(Terminal.SYSTYPE));
				map.put("payChannelId", map.get("payChannelId"));
				terminalsService.addTerminal(map);
				return Response.getSuccess("添加成功！");
			}
		} catch (Exception e) {
			  logger.debug("添加终端 "+e);
			  e.printStackTrace();
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
			String  password= terminalsService.findPassword((Integer)map.get("terminalid")) == null?null:
				terminalsService.findPassword((Integer)map.get("terminalid"));
			String pass = "该终端未设置密码！";
			if(password != null){
				/*pass = SysUtils.Decrypt(
						password,passPath);*/
				pass = password;
			}
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
	@ResponseBody
	public String Synchronous(@RequestBody Map<String, Object> map) {
		String url = timingPath + syncStatus;
		String response = null;
		try {
			response = CommonServiceUtil.synchronizeStatus(url, (Integer)map.get("terminalId"));
		} catch (IOException e) {
			logger.error("IOException...");
			return "{\"code\":-1,\"message\":\"同步失败\",\"result\":null}";
		}
		return response;
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
			// 追踪记录
			map.put("trackRecord", terminalsService.getTrackRecord((Integer)maps.get("terminalsId")));
			// 开通详情
			map.put("openingDetails",
					terminalsService.getOpeningDetails((Integer)maps.get("terminalsId")));
			return Response.getSuccess(map);
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	
	/**
	 * 进入终端详情(Web)
	 * 
	 * @param id
	 */
	@RequestMapping(value = "getWebApplyDetails", method = RequestMethod.POST)
	public Response getWebApplyDetails(@RequestBody Map<Object, Object> maps) {
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
			map.put("ReModel", terminalsService.getModule((Integer)maps.get("terminalsId"),(Integer)maps.get("types")));
			//获得用户收货地址
			map.put("address", terminalsService.getCustomerAddress((Integer)maps.get("customerId")));
			map.put("openingInfos",
					openingApplyService.getOppinfo((Integer)maps.get("terminalsId")));
			//城市级联
			/*map.put("Cities", terminalsService.getCities());*/
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
			maps.put("status", CsUpdateInfo.STATUS_1);
			terminalsService.subToUpdate(maps);
			return Response.getSuccess("更新成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 判断申请更新资料
	 * @param maps
	 */
	@RequestMapping(value = "judgeUpdate", method = RequestMethod.POST)
	public Response JudgeUpdate(@RequestBody Map<Object, Object> maps) {
		try {
			int count = terminalsService.judgeUpdateStatus((Integer)maps.get("terminalid"),CsUpdateInfo.STATUS_1,CsUpdateInfo.STATUS_2);
			if(count == 0){
				return Response.getSuccess("可以申请！");
			}else{
				return Response.getError("已有相关申请！");
			}
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
			if(maps.get("modelStatus") == null){
				maps.put("csCencelId", null);
			}else if(Integer.parseInt((String)maps.get("modelStatus")) == 1){
				CsCancel csCancel =new CsCancel();
				csCancel.setTerminalId((Integer)maps.get("terminalId"));
				csCancel.setStatus((Integer)maps.get("status"));
				csCancel.setTempleteInfoXml((maps.get("templeteInfoXml").toString()));
				csCancel.setTypes((Integer)maps.get("type"));
				csCancel.setCustomerId((Integer)maps.get("customerId"));
				//先注销
				terminalsService.subRentalReturn(csCancel);
				maps.put("csCencelId", csCancel.getId());
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
	 * 判断租赁退还申请
	 * 
	 * @param maps
	 */
	@RequestMapping(value = "JudgeLeaseReturn", method = RequestMethod.POST)
	public Response JudgeLeaseReturn(@RequestBody Map<Object, Object> maps) {
		try {
			int count = terminalsService.JudgeLeaseReturn((Integer)maps.get("terminalid"),CsLeaseReturn.STATUS_1,CsLeaseReturn.STATUS_2);
			if(count == 0){
				return Response.getSuccess("可以申请！");
			}else{
				return Response.getError("已有相关申请！");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 判断退货申请
	 * 
	 * @param maps
	 */
	@RequestMapping(value = "judgeReturn", method = RequestMethod.POST)
	public Response judgeReturn(@RequestBody Map<Object, Object> maps) {
		try {
			int count = terminalsService.JudgeReturn((Integer)maps.get("terminalid"),CsUpdateInfo.STATUS_1,CsUpdateInfo.STATUS_2);
			if(count == 0){
				return Response.getSuccess("可以申请！");
			}else{
				return Response.getError("已有相关申请！");
			}
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
			if(maps.get("modelStatus") == null){
				maps.put("csCencelId", null);
			}else if(Integer.parseInt((String)maps.get("modelStatus")) == 1){
			CsCancel csCancel =new CsCancel();
			csCancel.setTerminalId((Integer)maps.get("terminalsId"));
			csCancel.setStatus((Integer)maps.get("status"));
			csCancel.setTempleteInfoXml(maps.get("templeteInfoXml").toString());
			csCancel.setTypes((Integer)maps.get("type"));
			csCancel.setCustomerId((Integer)maps.get("customerId"));
			//先注销
			terminalsService.subRentalReturn(csCancel);
			maps.put("csCencelId", csCancel.getId());
			}
			terminalsService.subReturn(maps);
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
			csCancel.setTerminalId((Integer)maps.get("terminalId"));
			csCancel.setStatus(CsCancel.STATUS_1);
			csCancel.setTempleteInfoXml(maps.get("templeteInfoXml").toString());
			csCancel.setTypes((Integer)maps.get("type"));
			csCancel.setCustomerId((Integer)maps.get("customerId"));
			//注销
			terminalsService.subRentalReturn(csCancel);
			return Response.getSuccess("操作成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 判断申请注销
	 * 
	 * @param maps
	 */
	@RequestMapping(value = "judgeRentalReturn", method = RequestMethod.POST)
	public Response judgeRentalReturn(@RequestBody Map<Object, Object> maps) {
		try {
			int count = terminalsService.JudgeRentalReturnStatus((Integer)maps.get("terminalid"),CsCancel.STATUS_1,CsCancel.STATUS_2);
			if(count == 0){
				return Response.getSuccess("可以申请！");
			}else{
				return Response.getError("已有相关申请！");
			}
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
			maps.put("status", CsRepair.STATUS_1);
			terminalsService.subRepair(maps);
			return Response.getSuccess("操作成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 判断维修申请
	 * 
	 * @param maps
	 */
	@RequestMapping(value = "judgeRepair", method = RequestMethod.POST)
	public Response judgeRepair(@RequestBody Map<Object, Object> maps) {
		try {
			int count = terminalsService.JudgeRepair((Integer)maps.get("terminalid"),CsCancel.STATUS_1,CsCancel.STATUS_2);
			if(count == 0){
				return Response.getSuccess("可以申请！");
			}else{
				return Response.getError("已有相关申请！");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 判断换货申请
	 * 
	 * @param maps
	 */
	@RequestMapping(value = "judgeChang", method = RequestMethod.POST)
	public Response judgeChang(@RequestBody Map<Object, Object> maps) {
		try {
			//判断该终端是否已有未处理完的申请
			int count = terminalsService.JudgeChangStatus((Integer)maps.get("terminalid"),CsChange.STATUS_1,CsChange.STATUS_2);
			if(count == 0){
				return Response.getSuccess("可以申请！");
			}else{
				return Response.getError("已有相关申请！");
			}
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
			if(maps.get("modelStatus") == null){
				maps.put("csCencelId", null);
			}else if(Integer.parseInt((String)maps.get("modelStatus")) == 1){
				CsCancel csCancel =new CsCancel();
				csCancel.setTerminalId((Integer)maps.get("terminalsId"));
				csCancel.setStatus((Integer)maps.get("status"));
				csCancel.setTempleteInfoXml((maps.get("templeteInfoXml").toString()));
				csCancel.setTypes((Integer)maps.get("type"));
				csCancel.setCustomerId((Integer)maps.get("customerId"));
				//先注销
				terminalsService.subRentalReturn(csCancel);
				maps.put("csCencelId", csCancel.getId());
			}
			CsReceiverAddress csReceiverAddress =new CsReceiverAddress();
			//先添加换货地址表
			maps.put("templeteInfoXml", maps.get("templeteInfoXml").toString());
			csReceiverAddress = terminalsService.subRepairAddress(maps);
			
			maps.put("receiveAddressId", csReceiverAddress.getId());
			maps.put("status", CsChange.STATUS_1);
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
			Map<Object, Object> mp = new HashMap<Object, Object>();
			mp = terminalsService.getApplyDetails(maps.get("terminalsId"));
			map.put("applyDetails",mp);
			// 数据回显(重新开通申请)
			map.put("applyFor", openingApplyService.ReApplyFor((Integer)maps.get("terminalsId")));
			// 获得已有申请开通基本信息
						map.put("openingInfos",
								openingApplyService.getOppinfo((Integer)maps.get("terminalsId")));
			// 获得所有商户
			map.put("merchants", openingApplyService.getMerchants(maps.get("customerId")));
			// 获得材料等级
			map.put("MaterialLevel", openingApplyService.getMaterialLevel(maps.get("terminalsId")));
			//支付通道和周期列表
			List<Map<Object, Object>> list = terminalsService.getChannels();
			List<Map<Object, Object>> li = new ArrayList<Map<Object,Object>>();
			 for(Map<Object, Object> m:list){
				 if(m.get("id").equals(mp.get("channelId"))){
					 li.add(m);
				 }
			 }
			 
			 for(Map<Object, Object> m:li){
				 m.put("billings", terminalsService.channelsT(Integer.parseInt(m.get("id").toString())));
				 }
			map.put("channels", li);
			//城市级联
			map.put("CitieChen", terminalsService.getCities());
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
		    List<Map<String,Object>> list=terminalsService.openStatus(paramMap);
		    if(list!=null&&list.size()>0){
		        return Response.getSuccess(list);
		    }else{
		        return Response.getError("该手机未绑定终端！");
		    }
			
		} catch (Exception e) {
		    e.printStackTrace();
			return Response.getError("请求失败！");
		}
	}
	
	/**
	 * 从第三方接口获得银行
	 */
	@RequestMapping(value = "ChooseBank", method = RequestMethod.POST)
	public String ChooseBank(@RequestBody Map<String, Object> map) {
		String url = timingPath + bankList;
		String keyword = (String)map.get("keyword");
		Integer page = (Integer)map.get("page");
		Integer pageSize = (Integer)map.get("pageSize");
		String terminalId = (String)map.get("terminalId");
		Map<Object,Object> resultMap = terminalsService.getTerminalById(Integer.valueOf(terminalId));
		String response = null;
		String error = "{\"code\":-1,\"message\":\"没有获取到银行信息\",\"result\":{\"content\":null,\"total\":0,\"pageSize\":0,\"currentPage\":0,\"totalPage\":0}}";
		try {
			response = CommonServiceUtil.getBankList(url, keyword.trim(), page, pageSize, (Integer)resultMap.get("pay_channel_id"), 
					(String)resultMap.get("serial_num"));
		} catch (IOException e) {
			logger.error("从第三方接口获得银行异常！",e);
			return error;
		}
		if(response==null||"".equals(response.trim())){
			return error;
		}
		return response;
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
			String openingAppliesId = null;
			Integer terminalId = null;
			String key = null;
			Object value = null;
			Integer types = null;
			Integer openingRequirementId = null;
			Integer targetId =null;
			int y = 0;
			for (Map<String, Object> map : paramMap) {
				if (y == 0) {
					terminalId = (Integer)map.get("terminalId");
					//获得开通基本资料
					openingApplie.setTerminalId((Integer) map
							.get("terminalId"));
					openingApplie.setApplyCustomerId((Integer) map
							.get("applyCustomerId"));
					openingApplie.setTypes((Integer) map
							.get("publicPrivateStatus"));
					openingApplie.setMerchantId((Integer) map
							.get("merchantId"));
					openingApplie.setMerchantName((String) map
							.get("merchantName"));
					openingApplie.setSex((Integer) map
							.get("sex"));
					openingApplie.setBirthday( new SimpleDateFormat("yyyy-MM-dd").parse((String) map.get("birthday")));
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
					openingApplie.setBillingCydeId((Integer) map
							.get("billingId"));
					openingApplie.setAccountBankName((String) map
							.get("bankName"));
					openingApplie.setAccountBankCode((String) map
							.get("bankCode"));
					openingApplie.setTaxRegisteredNo((String) map
							.get("registeredNo"));
					openingApplie.setOrganizationCodeNo((String) map
							.get("organizationNo"));
					openingApplie.setBankName((String) map
							.get("bank_name"));
					if((Integer) map.get("needPreliminaryVerify") == 0){
						openingApplie.setStatus(OpeningApplie.STATUS_5);
					}
					if((Integer) map.get("needPreliminaryVerify") == 1){
						openingApplie.setStatus(OpeningApplie.STATUS_1);
					}
					//判断该商户是否存在
					Map<Object, Object> countMap =  openingApplyService.getMerchantsIsNo((String) map.get("merchantName"),(String) map.get("phone"));
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
							.get("applyCustomerId"));
					merchant.setCityId((Integer)map.get("cityId"));
					merchant.setPhone((String) map
						.get("phone"));
					if(countMap == null){
						openingApplyService.addMerchan(merchant);
						//获得添加后商户Id
						//terminalId = merchant.getId();
						openingApplie.setMerchantId(merchant.getId());
					}else if(countMap !=null){
						merchant.setId((Integer)countMap.get("id"));
						openingApplyService.updateMerchan(merchant);
						openingApplie.setMerchantId((Integer)countMap.get("id"));
					}
					//为终端表关联对应的商户id和通道周期ID 
					openingApplyService.updateterminal(openingApplie.getMerchantId(),terminalId,(Integer) map
							.get("billingId"));
					
					//判断该终端是申请开通还是从新申请
					if(terminalsService.judgeOpen(terminalId) != 0){
						openingAppliesId = String.valueOf(openingApplyService
								.getApplyesId(terminalId));
						// 删除旧数据
						openingApplyService.deleteOpeningInfos(Integer
								.valueOf(openingAppliesId));
						//修改申请表中的基本资料
						openingApplie.setId(Integer.parseInt(openingAppliesId));
						openingApplyService.updateApply(openingApplie);
						
					}else {
						openingApplyService.addOpeningApply(openingApplie);
						openingAppliesId = String
								.valueOf(openingApplie.getId());
					}
				} else {
							key = (String) map.get("key");
							types = (Integer) map.get("types");
							if(types == 2){
								value =  map.get("value").toString().substring(filePath.length());
							}else{
								value =  map.get("value");
							}
							openingRequirementId = (Integer) map.get("openingRequirementId");
							targetId =(Integer) map.get("targetId");
					openingApplyService.addApply(key, value,types, openingAppliesId,openingRequirementId,targetId);
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
	 * 对公对私材料名称(1 对公， 2对私)
	 * 
	 * @param id
	 * @param status
	 * @return
	 */
	@RequestMapping(value = "getMaterialName", method = RequestMethod.POST)
	public Response getMaterialName(@RequestBody Map<String, Integer> map) {
		try {
			
			// 数据回显(重新开通申请)
			List<Map<Object, Object>> list = openingApplyService.ReApplyFor((Integer)map.get("terminalId"));
			List<Map<Object, Object>> listMap = openingApplyService.getMaterialNameMap(
					map.get("terminalId")
					,map.get("status"));
			for(Map<Object, Object> mp:listMap){
				for(Map<Object, Object> mp1:list){
					if(mp.get("id").equals(mp1.get("target_id")) && mp.get("opening_requirements_id").equals(mp1.get("opening_requirement_id"))){
				        		 mp.put("value", mp1.get("value"));
					}
				}
			}
			return Response.getSuccess(listMap);
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
	 *获得省
	 * 
	 * @param id
	 * @param status
	 * @return
	 */
	@RequestMapping(value = "getCities", method = RequestMethod.POST)
	public Response getCities() {
		try {
			return Response.getSuccess(terminalsService.getCities());
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
     * 上传图片文件
     * 
     * @param request
     * @param response
     * @param id
     */
    @RequestMapping(value = "upload/tempImage/{id}", method = RequestMethod.POST)
    public Response tempImage(@PathVariable(value="id") int id,@RequestParam(value = "img") MultipartFile img, HttpServletRequest request) {
        try {
        	int temp=img.getOriginalFilename().lastIndexOf(".");
    		String houzuiStr=img.getOriginalFilename().substring(temp+1);
        	if(!commentService.typeIsCommit(houzuiStr)){
    			return Response.getError("您所上传的文件格式不正确");
    		}
        	String joinpath="";
        	joinpath = HttpFile.upload(img, userTerminal+id+"/opengImg/");
        	if("上传失败".equals(joinpath) || "同步上传失败".equals(joinpath))
        		return Response.getError(joinpath);
        	joinpath = filePath+joinpath;
        		return Response.getSuccess(joinpath);
        } catch (Exception e) {
        	e.printStackTrace();
            return Response.getError("请求失败！");
        }
    }
    
    /**
     * 终端换货资料上传
     * 
     * @param request
     * @param response
     * @param id
     */
    @RequestMapping(value = "upload/tempExchangFile/{id}", method = RequestMethod.POST)
    public Response tempExangFile(@PathVariable(value="id") int id,@RequestParam(value = "updatefile") MultipartFile updatefile, HttpServletRequest request) {
    	try {
    		//return Response.getSuccess(commentService.saveTmpImage(userTerminal+id+"/change/",updatefile, request));
    	
    		String joinpath = HttpFile.upload(updatefile, sysFileTerminal+id+"/change/");
        	if("上传失败".equals(joinpath) || "同步上传失败".equals(joinpath))
        		return Response.getError(joinpath);
        		return Response.getSuccess(joinpath);
    	} catch (Exception e) {
    		return Response.getError("请求失败！");
    	}
    }
    
    /**
     * 终端更新资料上传
     * 
     * @param request
     * @param response
     * @param id
     */
    @RequestMapping(value = "upload/tempUpdateFile/{id}", method = RequestMethod.POST)
    public Response tempUpdateFile(@PathVariable(value="id") int id,@RequestParam(value = "updatefile") MultipartFile updatefile, HttpServletRequest request) {
    	try {
        	String joinpath = HttpFile.upload(updatefile, sysFileTerminal+id+"/update/");
        	if("上传失败".equals(joinpath) || "同步上传失败".equals(joinpath))
        		return Response.getError(joinpath);
        		return Response.getSuccess(joinpath);
    	} catch (Exception e) {
    		return Response.getError("请求失败！");
    	}
    }
    
    /**
     * 终端注销料上传
     * 
     * @param request
     * @param response
     * @param id
     */
    @RequestMapping(value = "upload/tempCancellationFile/{id}", method = RequestMethod.POST)
    public Response tempCancellationFile(@PathVariable(value="id") int id,@RequestParam(value = "updatefile") MultipartFile updatefile, HttpServletRequest request) {
    	try {
    		String joinpath = HttpFile.upload(updatefile, sysFileTerminal+id+"/cancellation/");
        	if("上传失败".equals(joinpath) || "同步上传失败".equals(joinpath))
        		return Response.getError(joinpath);
        		return Response.getSuccess(joinpath);
    	} catch (Exception e) {
    		return Response.getError("请求失败！");
    	}
    }
    
    /**
     * 终端退货料上传
     * 
     * @param request
     * @param response
     * @param id
     */
    @RequestMapping(value = "upload/tempReturnFile/{id}", method = RequestMethod.POST)
    public Response tempReturnFile(@PathVariable(value="id") int id,@RequestParam(value = "updatefile") MultipartFile updatefile, HttpServletRequest request) {
    	try {
    		String joinpath = HttpFile.upload(updatefile, sysFileTerminal+id+"/return/");
        	if("上传失败".equals(joinpath) || "同步上传失败".equals(joinpath))
        		return Response.getError(joinpath);
        		return Response.getSuccess(joinpath);
    	} catch (Exception e) {
    		return Response.getError("请求失败！");
    	}
    }
    
    /**
     * 租赁退还资料上传
     * 
     * @param request
     * @param response
     * @param id
     */
    @RequestMapping(value = "upload/tempRentalFile/{id}", method = RequestMethod.POST)
    public Response tempRentalFile(@PathVariable(value="id") int id,@RequestParam(value = "updatefile") MultipartFile updatefile, HttpServletRequest request) {
    	try {
    		String joinpath = HttpFile.upload(updatefile, sysFileTerminal+id+"/rental/");
        	if("上传失败".equals(joinpath) || "同步上传失败".equals(joinpath))
        		return Response.getError(joinpath);
        		return Response.getSuccess(joinpath);
    	} catch (Exception e) {
    		return Response.getError("请求失败！");
    	}
    }
    
    
}
