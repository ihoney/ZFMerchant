package com.comdosoft.financial.user.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.Paging;
import com.comdosoft.financial.user.domain.zhangfu.Merchant;
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.mapper.zhangfu.MerchantMapper;

/**
 * 商户 - 业务层<br>
 *
 * @author Java-007 2015年2月7日
 *
 */
@Service
public class MerchantService {
	public static final Logger logger = LoggerFactory.getLogger(MerchantService.class);
    @Resource
    private MerchantMapper merchantMapper;

    @Value("${filePath}")
    private String filePath;
    
    public int getListCount(int customerId) {
        return merchantMapper.getListCount(customerId);
    }

    public List<Map<Object, Object>> getList(int customerId, int page, int rows) {
        Map<Object, Object> query = new HashMap<Object, Object>();
        query.put("customerId", customerId);
        Paging paging = new Paging(page, rows);
        query.put("offset", paging.getOffset());
        query.put("rows", paging.getRows());
        return merchantMapper.getList(query);
    }

    public Map<Object, Object> getOne(int id) {
        return merchantMapper.getOne(id);
    }
    
    public Merchant findMerchantById(int id) {
    	Merchant merchant = merchantMapper.findMerchantById(id);
        merchant = hasFilePathMerchant(merchant);
    	return merchant;
    }

    public void insert(Merchant merchant) {
        Date now = new Date();
        merchant.setCreatedAt(now);
        merchant = noFilePathMerchant(merchant);
        merchantMapper.insert(merchant);
    }

    /**
     * 
    * @Title: noFilePathMerchant 
    * @Description: (保存图片地址为相对路径) 
    * @return Merchant    返回类型 
    * @throws
     */
    private Merchant noFilePathMerchant(Merchant merchant) {
    	String accountPicPath = merchant.getAccountPicPath();
    	if(null != accountPicPath && accountPicPath.startsWith(filePath)){
			accountPicPath = accountPicPath.replaceFirst(filePath, "");
			merchant.setAccountPicPath(accountPicPath);
    	}
      	String bodyPhotoPath = merchant.getBodyPhotoPath();
      	if(null != bodyPhotoPath && bodyPhotoPath.startsWith(filePath)){
      		bodyPhotoPath = bodyPhotoPath.replaceFirst(filePath, "");
      		merchant.setBodyPhotoPath(bodyPhotoPath);
    	}
      	String cardIdBackPhotoPath = merchant.getCardIdBackPhotoPath();
      	if(null != cardIdBackPhotoPath && cardIdBackPhotoPath.startsWith(filePath)){
      		cardIdBackPhotoPath = cardIdBackPhotoPath.replaceFirst(filePath, "");
      		merchant.setCardIdBackPhotoPath(cardIdBackPhotoPath);
    	}
      	String cardIdFrontPhotoPath = merchant.getCardIdFrontPhotoPath();
      	if(null != cardIdFrontPhotoPath &&cardIdFrontPhotoPath.startsWith(filePath)){
      		cardIdFrontPhotoPath = cardIdFrontPhotoPath.replaceFirst(filePath, "");
          	merchant.setCardIdFrontPhotoPath(cardIdFrontPhotoPath);
    	}
      	String licenseNoPicPath = merchant.getLicenseNoPicPath();
      	if(null != licenseNoPicPath  && licenseNoPicPath.startsWith(filePath)){
      		licenseNoPicPath = licenseNoPicPath.replaceFirst(filePath, "");
      	  	merchant.setLicenseNoPicPath(licenseNoPicPath);
    	}
      	String orgCodeNoPicPath = merchant.getOrgCodeNoPicPath();
      	if(null != orgCodeNoPicPath  && orgCodeNoPicPath.startsWith(filePath)){
      		orgCodeNoPicPath = orgCodeNoPicPath.replaceFirst(filePath, "");
          	merchant.setOrgCodeNoPicPath( orgCodeNoPicPath);

    	}
      	String taxNoPicPath = merchant.getTaxNoPicPath();
      	if(null != taxNoPicPath && taxNoPicPath.startsWith(filePath)){
      		taxNoPicPath = taxNoPicPath.replaceFirst(filePath, "");
          	merchant.setTaxNoPicPath(taxNoPicPath);
    	}
    
		return merchant;
	}

    /**
     * 
    * @Title: hasFilePathMerchant 
    * @Description: (修改图片路径为绝对路径) 
    * @return Merchant    返回类型 
    * @throws
     */
	private Merchant hasFilePathMerchant(Merchant merchant) {
		String accountPicPath = merchant.getAccountPicPath();
    	if(accountPicPath.startsWith(filePath)){
			accountPicPath = accountPicPath.replaceFirst(filePath, "");
    	}
      	String bodyPhotoPath = merchant.getBodyPhotoPath();
      	if(bodyPhotoPath.startsWith(filePath)){
      		bodyPhotoPath = bodyPhotoPath.replaceFirst(filePath, "");
    	}
      	String cardIdBackPhotoPath = merchant.getCardIdBackPhotoPath();
      	if(cardIdBackPhotoPath.startsWith(filePath)){
      		cardIdBackPhotoPath = cardIdBackPhotoPath.replaceFirst(filePath, "");
    	}
      	String cardIdFrontPhotoPath = merchant.getCardIdFrontPhotoPath();
      	if(cardIdFrontPhotoPath.startsWith(filePath)){
      		cardIdFrontPhotoPath = cardIdFrontPhotoPath.replaceFirst(filePath, "");
    	}
      	String licenseNoPicPath = merchant.getLicenseNoPicPath();
      	if(licenseNoPicPath.startsWith(filePath)){
      		licenseNoPicPath = licenseNoPicPath.replaceFirst(filePath, "");
    	}
      	String orgCodeNoPicPath = merchant.getOrgCodeNoPicPath();
      	if(orgCodeNoPicPath.startsWith(filePath)){
      		orgCodeNoPicPath = orgCodeNoPicPath.replaceFirst(filePath, "");
    	}
      	String taxNoPicPath = merchant.getTaxNoPicPath();
      	if(taxNoPicPath.startsWith(filePath)){
      		taxNoPicPath = taxNoPicPath.replaceFirst(filePath, "");
    	}
    	merchant.setAccountPicPath(filePath+accountPicPath);
    	merchant.setBodyPhotoPath(filePath+bodyPhotoPath);
    	merchant.setCardIdBackPhotoPath(filePath+cardIdBackPhotoPath);
    	merchant.setCardIdFrontPhotoPath(filePath + cardIdFrontPhotoPath);
    	merchant.setLicenseNoPicPath(filePath+licenseNoPicPath);
    	merchant.setOrgCodeNoPicPath(filePath + orgCodeNoPicPath);
    	merchant.setTaxNoPicPath(filePath + taxNoPicPath);
		return merchant;
	}

	public void update(Merchant merchant) {
        Date now = new Date();
        merchant.setUpdatedAt(now);
        merchant = noFilePathMerchant(merchant);
        merchantMapper.update(merchant);
    }

    public void delete(int id) {
        merchantMapper.delete(id);
    }

    public Object findListCount(MyOrderReq req) {
        return merchantMapper.getListCount(req.getCustomer_id());
    }

    public Object findList(MyOrderReq req) {
        Map<Object, Object> query = new HashMap<Object, Object>();
        query.put("customerId", req.getCustomer_id());
        Paging paging = new Paging(req.getPage(), req.getRows());
        query.put("offset", paging.getOffset());
        query.put("rows", paging.getRows());
        return merchantMapper.getList(query);
    }

    /**
     * 查看商户是否存在
     * @param name
     * @return
     */
	public Boolean findMerchantByName(String name) {
		List<Map<String,Object>> m = merchantMapper.findMerchantByName(name);
		logger.debug(name+">>>>>查看商户是否存在>>>>>>>>>>"+m+">>>>>>>>>>>>>>");
		if(m.size()<1){
			return false;//不存在
		}else{
			return true;//存在
		}
	}
}