package com.comdosoft.financial.user.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.comdosoft.financial.user.domain.Paging;
import com.comdosoft.financial.user.domain.query.MailReq;
import com.comdosoft.financial.user.domain.zhangfu.Customer;
import com.comdosoft.financial.user.domain.zhangfu.CustomerAddress;
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.domain.zhangfu.SysConfig;
import com.comdosoft.financial.user.mapper.zhangfu.CustomerMapper;
import com.comdosoft.financial.user.utils.SysUtils;

/**
 * 用户 - 业务层<br>
 *
 * @author Java-007 2015年2月7日
 *
 */
@Service
public class CustomerService {

    @Resource
    private CustomerMapper customerMapper;
    @Resource
    private MailService mailService;

    public Map<Object, Object> getSysConfig(String paramName) {
        return customerMapper.getSysConfig(paramName);
    }

    public Map<Object, Object> getOne(int id) {
        return customerMapper.getOne(id);
    }

    public void update(Map<Object, Object> param) {
        customerMapper.update(param);
    }

    public void updatePassword(Map<Object, Object> param) {
        customerMapper.updatePassword(param);
    }

    public int getTradeRecordsCount(int customerId) {
        return customerMapper.getTradeRecordsCount(customerId);
    }

    public List<Map<Object, Object>> getIntegralList(int customerId, int page, int rows) {
        Map<Object, Object> param = new HashMap<Object, Object>();
        param.put("customerId", customerId);
        Paging paging = new Paging(page, rows);
        param.put("offset", paging.getOffset());
        param.put("rows", paging.getRows());
        return customerMapper.getIntegralList(param);
    }

    public Map<Object, Object> getIntegralTotal(int customerId) {
//        Map<Object, Object> sysconfig = customerMapper.getSysConfig(SysConfig.PARAMNAME_INTEGRALCONVERT);
//        BigDecimal paramValue = new BigDecimal((String) sysconfig.get("param_value"));
        Map<Object, Object> totalMap = customerMapper.getIntegralTotal(customerId);
//        BigDecimal quantityTotal = new BigDecimal(0);
//        if (!CollectionUtils.isEmpty(totalMap)) {
//            Object obj = totalMap.get("quantityTotal");
//            if (obj != null) {
//                quantityTotal = (BigDecimal) totalMap.get("quantityTotal");
//            }
//        }
        Map<Object, Object> result = new HashMap<>();
        if(null == totalMap){
        	return result;
        }
        String quantityTotal =  totalMap.get("quantityTotal")==null ?"":totalMap.get("quantityTotal")+"";
        String moneyTotal =  totalMap.get("moneyTotal")==null ?"":totalMap.get("moneyTotal")+"";
        result.put("quantityTotal", quantityTotal);
        result.put("moneyTotal", moneyTotal);
        return result;
    }

    public void insertIntegralConvert(Map<Object, Object> param) {
        Map<Object, Object> sysconfig = customerMapper.getSysConfig(SysConfig.PARAMNAME_INTEGRALCONVERT);
        BigDecimal paramValue = new BigDecimal((String) sysconfig.get("param_value"));
        BigDecimal price = new BigDecimal(Integer.parseInt(param.get("price").toString()));
        BigDecimal quantity =price.multiply(paramValue);//多少积分
        Date now = new Date();
        param.put("createdAt", now);
        param.put("updatedAt", now);
        param.put("quantity", quantity.intValue());
        param.put("price", price.multiply(new BigDecimal(100)));
        customerMapper.insertIntegralConvert(param);
    }

    public void insertIntegralRecord(Map<Object, Object> param) {
        customerMapper.insertIntegralRecord(param);
    }

    public List<Map<Object, Object>> getAddressList(int customerId) {
        return customerMapper.getAddressList(customerId);
    }

    public Map<Object, Object> getOneAddress(int id) {
        return customerMapper.getOneAddress(id);
    }

    @Transactional(value = "transactionManager-zhangfu")
    public int insertAddress(Map<Object, Object> param) {
        int isDefault = Integer.parseInt(param.get("isDefault").toString());
        if (isDefault == CustomerAddress.ISDEFAULT_1) {
            param.put("is_default", CustomerAddress.ISDEFAULT_2);
            customerMapper.updateDefaultAddress(param);
        }
        CustomerAddress ca = new CustomerAddress();
        ca.setAddress(param.get("address")==null?"":param.get("address")+"");
        String cityId = param.get("cityId")==null?"":param.get("cityId")+"";
        if(cityId !=""){
        	ca.setCityId(Integer.parseInt(cityId));
        }
        ca.setCreatedAt(new Date());
        ca.setCustomerId((Integer) (param.get("customerId")==null?0:param.get("customerId")));
        ca.setIsDefault(isDefault);
        ca.setMoblephone(param.get("moblephone")==null?"":param.get("moblephone")+"");
        ca.setReceiver(param.get("receiver")==null?"":param.get("receiver")+"");
        ca.setTelphone(param.get("telphone")==null?"":param.get("telphone")+"");
        ca.setZipCode(param.get("zipCode")==null?"":param.get("zipCode")+"");
        customerMapper.insertAddress(ca);
        int i = ca.getId();
        return i;
    }

    @Transactional(value = "transactionManager-zhangfu")
    public void updateAddress(Map<Object, Object> param) {
        int isDefault = Integer.parseInt(param.get("isDefault").toString());
        String cid = param.get("customerId")==null ?"":param.get("customerId")+"";
  	    Integer addressId = (Integer) param.get("id");
        if(cid == ""){
        	CustomerAddress ca = customerMapper.findAddressById(addressId);
        	param.put("customerId", ca.getCustomerId());
        }
        if (isDefault == CustomerAddress.ISDEFAULT_1) {
            param.put("is_default", CustomerAddress.ISDEFAULT_2);
            customerMapper.updateDefaultAddress(param);
            param.put("is_default", isDefault);
            customerMapper.updateAddress(param);
        }else  {
        	customerMapper.updateAddress(param);
        }
        
    }

    @Transactional(value = "transactionManager-zhangfu")
    public void setDefaultAddress(Map<Object, Object> param) {
        param.put("is_default", CustomerAddress.ISDEFAULT_2); // 其它设置为非默认
//        customerMapper.updateDefaultAddress(param);
        customerMapper.setNotDefaultAddress(param);
        customerMapper.setDefaultAddress(param);
    }

    public void deleteAddress(int id) {
        customerMapper.deleteAddress(id);
    }

    public Map<String, Object> findCustById(MyOrderReq req) {
        return customerMapper.findCustById(req);
    }
    @Transactional(value = "transactionManager-zhangfu")
    public void cust_update(Customer c) {
        customerMapper.cust_update(c);
    }

    public Object getjifen(MyOrderReq req) {
        return customerMapper.getjifen(req);
    }

    public Boolean findUsername(String p,Integer id) {
        List<Map<String,Object>> list = customerMapper.findUsername(p);
        if(list.size()>1){
            return true;
        }else if(list.size()==1){
            Map<String,Object> m = list.get(0);
            String  iid = m.get("id")==null?"":m.get("id").toString();
            if(iid.equals(id.toString())){
                return false;
            }else{
                return true;
            }
        }else{//不存在 
            return false;
        }
    }
    
	public Object getUpdateEmailDentcode(int customerId, String email) {
		Map<Object, Object> result = new HashMap<Object, Object>();
		// 生成随机6位验证码
		String dentcode = SysUtils.getCode();
		result.put("dentcode", dentcode);
		Customer c = new Customer();
		c.setId(customerId);
		c.setDentcode(dentcode);
		customerMapper.cust_update(c);
		System.err.println(c.getName());
		// 保存验证码入库
		c = customerMapper.getCustomerById(c);
		String n = c.getName();
		MailReq req = new MailReq();
		req.setUserName(n);// 姓名
		req.setAddress(email);// 邮箱
		try {
			mailService.sendMail_phone(req,dentcode,"确认邮箱");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public Customer getCustomerById(Customer param) {
		return customerMapper.getCustomerById(param);
	}

	public int countAddress(Map<Object, Object> param) {
		return customerMapper.countAddress(param);
	}

}