package com.comdosoft.financial.manage.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.comdosoft.financial.manage.domain.zhangfu.Good;
import com.comdosoft.financial.manage.mapper.zhangfu.GoodMapper;
import com.comdosoft.financial.manage.utils.page.Page;
import com.comdosoft.financial.manage.utils.page.PageRequest;

@Service
public class GoodService {

	@Autowired
	private GoodMapper goodMapper;
	
	public Page<Good> findPages(int page, int pageSize, Integer status, String keys){
		if (keys != null) {
			keys = "%"+keys+"%";
		}
		long count = goodMapper.countByKeys(status, keys);
		if (count == 0) {
			return new Page<Good>(new PageRequest(1, pageSize), new ArrayList<Good>(), count);
		}
		
		PageRequest request = new PageRequest(page, pageSize);
		List<Good> result = goodMapper.findPageGoodsByKeys(request, status, keys);
		Page<Good> goods = new Page<Good>(request, result, count);
		if (goods.getCurrentPage() > goods.getTotalPage()) {
			request = new PageRequest(goods.getTotalPage(), pageSize);
			result = goodMapper.findPageGoodsByKeys(request, status, keys);
			goods = new Page<Good>(request, result, count);
		}
		return goods;
	}
	
	
	public Good findGoodInfo(Long id) {
		return goodMapper.findGoodInfo(id);
	}
	
	public Good findRowGood(Long id) {
		return goodMapper.findPageRowGood(id);
	}
	
	/**
	 * 初审不通过
	 * @param id
	 * @return
	 */
	@Transactional("transactionManager")
	public Good statusFirstUnCheck(Long id){
		Good good = goodMapper.findPageRowGood(id);
		if (good.getStatus() == Good.STATUS_WAITING_FIRST_CHECK) {
			good.setStatus(Good.STATUS_FIRST_UN_CHECKED);
			goodMapper.updateByPrimaryKey(good);
		}
		return good;
	}
	
	/**
	 * 初审通过
	 * @param id
	 * @return
	 */
	@Transactional("transactionManager")
	public Good statusFirstCheck(Long id){
		Good good = goodMapper.findPageRowGood(id);
		if (good.getStatus() == Good.STATUS_WAITING_FIRST_CHECK
				|| good.getStatus() == Good.STATUS_FIRST_UN_CHECKED) {
			good.setStatus(Good.STATUS_FIRST_CHECKED);
			goodMapper.updateByPrimaryKey(good);
		}
		return good;
	}
	
	/**
	 * 审核不通过
	 * @param id
	 * @return
	 */
	@Transactional("transactionManager")
	public Good statusUnCheck(Long id){
		Good good = goodMapper.findPageRowGood(id);
		if (good.getStatus() == Good.STATUS_WAITING_FIRST_CHECK
				|| good.getStatus() == Good.STATUS_FIRST_CHECKED) {
			good.setStatus(Good.STATUS_UN_CHECKED);
			goodMapper.updateByPrimaryKey(good);
		}
		return good;
	}
	
	/**
	 * 审核通过
	 * @param id
	 * @return
	 */
	@Transactional("transactionManager")
	public Good statusCheck(Long id){
		Good good = goodMapper.findPageRowGood(id);
		if (good.getStatus() == Good.STATUS_WAITING_FIRST_CHECK
				|| good.getStatus() == Good.STATUS_FIRST_UN_CHECKED
				|| good.getStatus() == Good.STATUS_FIRST_CHECKED
				|| good.getStatus() == Good.STATUS_UN_CHECKED) {
			good.setStatus(Good.STATUS_CHECKED);
			goodMapper.updateByPrimaryKey(good);
		}
		return good;
	}
	
	/**
	 * 停止
	 * @param id
	 * @return
	 */
	@Transactional("transactionManager")
	public Good statusStop(Long id){
		Good good = goodMapper.findPageRowGood(id);
		if (good.getStatus() == Good.STATUS_CHECKED) {
			good.setStatus(Good.STATUS_STOP);
			good.setIsPublished(false);
			goodMapper.updateByPrimaryKey(good);
		}
		return good;
	}
	
	/**
	 * 启用
	 * @param id
	 * @return
	 */
	@Transactional("transactionManager")
	public Good statusWaitingFirstCheck(Long id){
		Good good = goodMapper.findPageRowGood(id);
		if (good.getStatus() == Good.STATUS_STOP) {
			good.setStatus(Good.STATUS_WAITING_FIRST_CHECK);
			goodMapper.updateByPrimaryKey(good);
		}
		return good;
	}


	/**
	 * 上架
	 * @param id
	 * @return
	 */
	@Transactional("transactionManager")
	public Good publish(Long id) {
		Good good = goodMapper.findPageRowGood(id);
		if (good.getStatus() == Good.STATUS_CHECKED) {
			good.setPublishedAt(new Date());
			good.setIsPublished(true);
			goodMapper.updateByPrimaryKey(good);
		}
		return good;
	}
	
	/**
	 * 下架
	 * @param id
	 * @return
	 */
	@Transactional("transactionManager")
	public Good unPublish(Long id) {
		Good good = goodMapper.findPageRowGood(id);
		if (good.getStatus() == Good.STATUS_CHECKED) {
			good.setIsPublished(false);
			goodMapper.updateByPrimaryKey(good);
		}
		return good;
	}
	
	/**
	 * 可租赁
	 * @param id
	 * @return
	 */
	@Transactional("transactionManager")
	public Good lease(Long id) {
		Good good = goodMapper.findPageRowGood(id);
		if (good.getStatus() == Good.STATUS_CHECKED) {
			good.setHasLease(true);
			goodMapper.updateByPrimaryKey(good);
		}
		return good;
	}
	
	/**
	 * 不可租赁
	 * @param id
	 * @return
	 */
	@Transactional("transactionManager")
	public Good unLease(Long id) {
		Good good = goodMapper.findPageRowGood(id);
		if (good.getStatus() == Good.STATUS_CHECKED) {
			good.setHasLease(false);
			goodMapper.updateByPrimaryKey(good);
		}
		return good;
	}
	
	/**
	 * 可批购
	 * @param id
	 * @return
	 */
	@Transactional("transactionManager")
	public Good purchase(Long id) {
		Good good = goodMapper.findPageRowGood(id);
		if (good.getStatus() == Good.STATUS_CHECKED) {
			good.setHasPurchase(true);
			goodMapper.updateByPrimaryKey(good);
		}
		return good;
	}
	
	/**
	 * 不可批购
	 * @param id
	 * @return
	 */
	@Transactional("transactionManager")
	public Good unPurchase(Long id) {
		Good good = goodMapper.findPageRowGood(id);
		if (good.getStatus() == Good.STATUS_CHECKED) {
			good.setHasPurchase(false);
			goodMapper.updateByPrimaryKey(good);
		}
		return good;
	}
	
}
