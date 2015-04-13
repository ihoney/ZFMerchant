package com.comdosoft.financial.user.service;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import com.comdosoft.financial.user.domain.zhangfu.CustomerIntegralRecord; 
import com.comdosoft.financial.user.mapper.trades.record.TradeRecordStatisticsMapper;
import com.comdosoft.financial.user.mapper.zhangfu.StatisticsIntegralTaskMapper;
import com.comdosoft.financial.user.utils.Constants;

/**
 * 购买Pos机统计，业务层
 * 
 * @author DELL
 *
 */
@Service
public class StatisticsIntegralTaskService {

	@Autowired
	private StatisticsIntegralTaskMapper statisticsIntegralTaskMapper;

	@Autowired
	private TradeRecordStatisticsMapper tradeRecordStatisticsMapper;

	/**
	 * 
	 * @throws Exception
	 */
	public void statisticsIntegral() throws Exception {
		// 未统计积分的订单。
		List<Map<String, Object>> orders = statisticsIntegralTaskMapper
				.findOrderInfo();

		CustomerIntegralRecord cir = null;
		// 积分计算规则
		int posValue = statisticsIntegralTaskMapper
				.findPosValue(Constants.INTEGRAL_BUY_POS);
		int tempId = 0;
		int sumScore = 0;
		for (Iterator iterator = orders.iterator(); iterator.hasNext();) {
			Map<String, Object> map = (Map<String, Object>) iterator.next();
			cir = new CustomerIntegralRecord();
			// 计算这条订单所获取的积分。
			int sumIntegral = (((int) map.get("actual_price")) / 100 / posValue);
			// 更新当前id的order积分统计状态为 已统计
			statisticsIntegralTaskMapper.updateOrdersIntegralStatus((int) map
					.get("id"));
			// 新增record
			cir.setCustomerId((int) map.get("customer_id"));
			cir.setCreatedAt(new Date());
			cir.setQuantity(sumIntegral);
			cir.setTargetId((int) map.get("id"));
			cir.setTypes((byte) 1);
			cir.setTargetType((byte) 2);
			statisticsIntegralTaskMapper.insertCustomerIntegralRecords(cir);
			if (tempId == 0) {
				tempId = (int) map.get("customer_id");
			}
			sumScore += sumIntegral;
			if (tempId != (int) map.get("customer_id")) { 
				// 更新customer表的积分(integral +)
				int integral = statisticsIntegralTaskMapper
						.findCustomerIntegral(tempId);
				integral += sumScore;
				statisticsIntegralTaskMapper.updateCustomerIntegral(tempId,
						integral);
				tempId = 0;
				sumScore = 0;
			}
		}
	}

	
	/**
	 * 交易流水 积分统计
	 */
	public void transactionFlowingService() throws Exception{
		List<Map<String, Object>> records = tradeRecordStatisticsMapper
				.findTradeRecords();
		CustomerIntegralRecord cir = null;
		// 积分计算规则
		int posValue = statisticsIntegralTaskMapper
				.findPosValue(Constants.INTEGRAL_TRADE);
		//临时id
		int tempId = 0;
		int sumScore = 0;
		for (Iterator iterator = records.iterator(); iterator.hasNext();) {
			Map<String, Object> map = (Map<String, Object>) iterator.next();
			cir = new CustomerIntegralRecord();
			// 计算这条订单所获取的积分。
			int sumIntegral = ((int) map.get("amount") / 100 / posValue);
			// 更新当前id的tradeRecords积分统计状态为 已统计
			tradeRecordStatisticsMapper.updateTradeRecords((int)map.get("id"));
			// 新增record
			cir.setCustomerId((int) map.get("customer_id"));
			cir.setCreatedAt(new Date());
			cir.setQuantity(sumIntegral);
			cir.setTargetId((int) map.get("id"));
			cir.setTypes((byte) 1);
			cir.setTargetType((byte) 1);
			statisticsIntegralTaskMapper.insertCustomerIntegralRecords(cir);
			if (tempId == 0) {
				tempId = (int) map.get("customer_id");
			}
			sumScore += sumIntegral;
			if (tempId != (int) map.get("customer_id")) { 
				// 更新customer表的积分(integral +)
				int integral = statisticsIntegralTaskMapper
						.findCustomerIntegral(tempId);
				integral += sumScore;
				statisticsIntegralTaskMapper.updateCustomerIntegral(tempId,
						integral);
				tempId = 0;
				sumScore = 0;
			}
		}
	}
}
