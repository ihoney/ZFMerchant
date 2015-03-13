package com.comdosoft.financial.user.mapper.zhangfu;



import java.util.List;
import java.util.Map;

import com.comdosoft.financial.user.domain.zhangfu.Merchant;
import com.comdosoft.financial.user.domain.zhangfu.OpeningApplie;
import com.comdosoft.financial.user.domain.zhangfu.OpeningRequirement;



/**
 * 用户申请开通
 * @author xianfeihu
 *
 */
public interface OpeningApplyMapper {
	
	/**
	 * 根据用户id得到所有申请列表
	 * @param map
	 * @return
	 */
	List<Map<Object, Object>> getApplyList(Map<String, Object> map);
	
	/**
	 * 根据终端id获得该终端详情
	 * @param terminalsId
	 * @return
	 */
	Map<String, Object> getApplyDetails(int terminalsId);
	
	/**
	 * 获得已有开通申请基本申请信息
	 * @param id
	 * @return
	 */
	Map<String, Object> getOppinfo(OpeningApplie openingApplie);
	
	/**
	 * 获得所有商户
	 * @return
	 */
	List<Merchant> getMerchants(int customerId);
	
	/**
	 * 申请开通时判断商户是否存在
	 * @return
	 */
	int getMerchantsIsNo(String legalPersonCardId);
	
	/**
	 * 添加商户
	 * @return
	 */
	void addMerchan(Merchant merchant);
	
	/**
	 * 获得所有通道
	 * @return
	 */
	List<Map<Object, Object>> getChannels();
	
	/**
	 * 获得所有通道周期
	 * @return
	 */
	List<Map<Object, Object>> channelsT(int id);
	
	/**
	 * 申请资料数据回显
	 * @param id
	 * @return
	 */
	List<Map<String, String>> ReApplyFor(Integer id);
	
	/**
	 * 根据商户id获得商户详情信息
	 * @param id
	 * @return
	 */
	Map<String, String> getMerchant(Integer id);
	
	/**
	 * 添加开通信息
	 * @param map
	 */
	void addApply(Map<String, Object> map);
	
	/**
	 * 添加开通关联信息
	 * @param map
	 */
	void addOpeningApply(OpeningApplie openingApplie);
	
	/**
	 * 获得材料名字
	 * @param id
	 * @return
	 */
	List<Merchant> getMaterialName(Map<Object, Object> map);
	
	/**
	 * 查看该终端材料等级个数
	 * @param id
	 * @return
	 */
	List<OpeningRequirement> getMaterialLevel(int terminalsId);
	
	/**
	 * 获得申请表的id
	 * @param id
	 * @return
	 */
	int getApplyesId(Integer id);
	
	/**
	 * 重新申请开通(先删除旧数据)
	 * @param id
	 */
	void deleteOpeningInfos(Integer id);
}
