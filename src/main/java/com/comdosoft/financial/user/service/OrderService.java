package com.comdosoft.financial.user.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.comdosoft.financial.user.domain.query.OrderReq;
import com.comdosoft.financial.user.domain.query.PosReq;
import com.comdosoft.financial.user.domain.zhangfu.Good;
import com.comdosoft.financial.user.domain.zhangfu.GoodsPicture;
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.domain.zhangfu.Order;
import com.comdosoft.financial.user.domain.zhangfu.OrderGood;
import com.comdosoft.financial.user.domain.zhangfu.OrderStatus;
import com.comdosoft.financial.user.domain.zhangfu.Terminal;
import com.comdosoft.financial.user.mapper.zhangfu.GoodMapper;
import com.comdosoft.financial.user.mapper.zhangfu.OrderMapper;
import com.comdosoft.financial.user.mapper.zhangfu.ShopCartMapper;
import com.comdosoft.financial.user.utils.OrderUtils;
import com.comdosoft.financial.user.utils.SysUtils;
import com.comdosoft.financial.user.utils.Exception.LowstocksException;
import com.comdosoft.financial.user.utils.page.Page;
import com.comdosoft.financial.user.utils.page.PageRequest;
import com.comdosoft.financial.user.utils.unionpay.UnionpayService;

@Service
public class OrderService {
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private GoodMapper goodMapper;
    @Autowired
    private ShopCartMapper shopCartMapper;

    @Value("${filePath}")
    private String filePath;

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);
    
    private static SimpleDateFormat sdf_simple = new SimpleDateFormat("yyyyMMddHHmmss"); 
    
    @Transactional(value = "transactionManager-zhangfu")
    public int createOrderFromCart(OrderReq orderreq) throws LowstocksException {
        if (0 == orderreq.getAddressId()) {
            orderreq.setAddressId(goodMapper.getAdId(orderreq.getCustomerId()));
        }
        orderreq.setCartids(SysUtils.Arry2Str(orderreq.getCartid()));
        int totalprice = 0;
        int count = 0;
        List<Map<String, Object>> checkList = orderMapper.checkList(orderreq);
        if(checkList.size()!=orderreq.getCartid().length){
            return -3;
        }
        for (Map<String, Object> map : checkList) {
            int count2 = SysUtils.String2int("" + map.get("count"));
            int quantity = SysUtils.String2int("" + map.get("quantity"));
            if (count2 < quantity) {
                throw new LowstocksException("库存不足");
            } else {
                int goodId = SysUtils.String2int("" + map.get("goodid"));
                PosReq posreq = new PosReq();
                posreq.setGoodId(goodId);
                posreq.setCity_id(count2 - quantity);
                goodMapper.upQuantity(posreq);
            }
        }
        List<Map<String, Object>> goodMapList = orderMapper.getGoodInfos(orderreq);
        int flag=0;
        int gg=0;
        for (Map<String, Object> map : goodMapList) {
            int retail_price = SysUtils.String2int("" + map.get("retail_price"));
            int quantity = SysUtils.String2int("" + map.get("quantity"));
            int opening_cost = SysUtils.String2int("" + map.get("opening_cost"));
            totalprice += (retail_price + opening_cost) * quantity;
            count += quantity;
            int bb=SysUtils.String2int(map.get("belongs_to").toString());
            if(bb>0){
                gg++; 
                flag=bb;
            }
        }
        if(gg==goodMapList.size()){
            orderreq.setBelongto(flag);
        }else{
            orderreq.setBelongto(null);
        }
        orderreq.setType(1);
        orderreq.setTotalcount(count);
        orderreq.setTotalprice(totalprice);
        orderreq.setOrdernumber(SysUtils.getOrderNum(0));
        orderMapper.addOrder(orderreq);
        for (Map<String, Object> map : goodMapList) {
            orderreq.setGoodId(SysUtils.String2int("" + map.get("goodid")));
            orderreq.setPaychannelId(SysUtils.String2int("" + map.get("paychanelid")));
            orderreq.setQuantity(SysUtils.String2int("" + map.get("quantity")));
            int price = SysUtils.String2int("" + map.get("price"));
            int retail_price = SysUtils.String2int("" + map.get("retail_price"));
            int quantity = SysUtils.String2int("" + map.get("quantity"));
            int opening_cost = SysUtils.String2int("" + map.get("opening_cost"));
            orderreq.setPrice(price + opening_cost);
            orderreq.setRetail_price(retail_price + opening_cost);
            orderreq.setQuantity(quantity);
            orderMapper.addOrderGood(orderreq);
            shopCartMapper.delete(SysUtils.String2int("" + map.get("id")));
        }
        return orderreq.getId();
    }

    @Transactional(value = "transactionManager-zhangfu")
    public int createOrderFromShop(OrderReq orderreq) throws LowstocksException {
        if (0 == orderreq.getAddressId()) {
            orderreq.setAddressId(goodMapper.getAdId(orderreq.getCustomerId()));
        }
        Map<String, Object> goodMap = orderMapper.getGoodInfo(orderreq);
        int bb=SysUtils.String2int(goodMap.get("belongs_to").toString());
        if(bb==0){
            orderreq.setBelongto(null);
        }else{
            orderreq.setBelongto(bb);
        }
        int retail_price = SysUtils.String2int("" + goodMap.get("retail_price"));
        int quantity = orderreq.getQuantity();
        int count = SysUtils.String2int("" + goodMap.get("count"));
        if (count < quantity) {
            throw new LowstocksException("库存不足");
        } else {
            int goodId = SysUtils.String2int("" + goodMap.get("goodid"));
            PosReq posreq = new PosReq();
            posreq.setGoodId(goodId);
            posreq.setCity_id(count - quantity);
            goodMapper.upQuantity(posreq);
        }
        int opening_cost = SysUtils.String2int("" + goodMap.get("opening_cost"));
        int totalprice = (retail_price + opening_cost) * quantity;
        orderreq.setTotalcount(quantity);
        orderreq.setTotalprice(totalprice);
        orderreq.setOrdernumber(SysUtils.getOrderNum(1));
        orderreq.setType(1);
        orderMapper.addOrder(orderreq);
        int price = SysUtils.String2int("" + goodMap.get("price"));
        orderreq.setPrice(price + opening_cost);
        orderreq.setRetail_price(retail_price + opening_cost);
        orderMapper.addOrderGood(orderreq);
        return orderreq.getId();
    }

    @Transactional(value = "transactionManager-zhangfu")
    public int createOrderFromLease(OrderReq orderreq) throws LowstocksException {
        if (0 == orderreq.getAddressId()) {
            orderreq.setAddressId(goodMapper.getAdId(orderreq.getCustomerId()));
        }
        Map<String, Object> goodMap = orderMapper.getGoodInfo(orderreq);
        int bb=SysUtils.String2int(goodMap.get("belongs_to").toString());
        if(bb==0){
            orderreq.setBelongto(null);
        }else{
            orderreq.setBelongto(bb);
        }
        int lease_deposit = SysUtils.String2int("" + goodMap.get("lease_deposit"));
        int quantity = orderreq.getQuantity();
        int count = SysUtils.String2int("" + goodMap.get("count"));
        if (count < quantity) {
            throw new LowstocksException("库存不足");
        } else {
            int goodId = SysUtils.String2int("" + goodMap.get("goodid"));
            PosReq posreq = new PosReq();
            posreq.setGoodId(goodId);
            posreq.setCity_id(count - quantity);
            goodMapper.upQuantity(posreq);
        }
        int opening_cost = SysUtils.String2int("" + goodMap.get("opening_cost"));
        int totalprice = (lease_deposit + opening_cost) * quantity;
        orderreq.setTotalcount(quantity);
        orderreq.setTotalprice(totalprice);
        orderreq.setOrdernumber(SysUtils.getOrderNum(2));
        orderreq.setType(2);
        orderMapper.addOrder(orderreq);
        orderreq.setPrice(lease_deposit + opening_cost);
        orderreq.setRetail_price(lease_deposit + opening_cost);
        orderMapper.addOrderGood(orderreq);
        return orderreq.getId();
    }

    public Map<String, Object> payOrder(OrderReq orderreq) {
    	//必须存在订单ID
        Map<String, Object> map = orderMapper.getPayOrder(orderreq);
        String paytype = String.valueOf(map.get("paytype"));
        //如未完成支付,调用第三方支付交易状态查询接口更新订单状态
        if("0".equals(paytype)){
        	int _paytype = orderreq.getPayway();
        	if(2 == _paytype){
        		String orderId = (String) map.get("order_number");
        		Date created_at = (Date) map.get("created_at");
        		String txnTime = sdf_simple.format(created_at);
        		try{
	        		Map<String,String> queryResult =UnionpayService.query(orderId, txnTime);
	        		if(null != queryResult && "00".equals(queryResult.get("respCode"))){
	        			//必须存在订单编号
	        			orderreq.setOrdernumber(orderId);
	        			orderreq.setType(_paytype);
	        			payFinish(orderreq);
	        			map = orderMapper.getPayOrder(orderreq);
	        		}
        		}catch(Exception e){
        			e.printStackTrace();
        		}
        	}
        }
        map.put("good", orderMapper.getPayOrderGood(orderreq));
        return map;
    }

    public void payFinish(OrderReq orderreq) {
        Map<String, Object> map = orderMapper.getOrderByMumber(orderreq);
        if(null == map){
        	return;
        }
        try {
            int id = SysUtils.String2int(map.get("id").toString());
            int total_price = SysUtils.String2int(map.get("total_price").toString());
            orderreq.setId(id);
            orderreq.setPrice(total_price);
            if(0 == orderreq.getType()){
            	orderreq.setType(1);
            }
            orderMapper.payFinish(orderreq);
            orderMapper.upOrder(orderreq);
        } catch (Exception e) {
        	e.printStackTrace();
        	logger.debug("完成订单处理异常",e);
        }
    }

    /**
     * 上jwb ------------------------------------------------------------- 下gch
     */

    public Page<Object> findMyOrderAll(MyOrderReq myOrderReq) {
        PageRequest request = new PageRequest(myOrderReq.getPage(), myOrderReq.getRows());
        int count = orderMapper.countMyOrder(myOrderReq);
        List<Order> centers = orderMapper.findMyOrderAll(myOrderReq);
        List<Object> obj_list = putDate(centers);
        return new Page<Object>(request, obj_list, count);
    }

    public List<Object> putDate(List<Order> centers) {
        List<Object> obj_list = new ArrayList<Object>();
        Map<String, Object> map = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for (Order o : centers) {
            map = new HashMap<String, Object>();
            map.put("order_id", o.getId() + "");
            map.put("order_type", o.getTypes() == null ? "" : o.getTypes() + "");
            map.put("order_number", o.getOrderNumber() == null ? "" : o.getOrderNumber());
            if (o.getCreatedAt() != null) {
                String d = sdf.format(o.getCreatedAt());
                map.put("order_createTime", d);
            } else {
                map.put("order_createTime", "");
            }
            map.put("order_status", o.getStatus() == null ? "" : o.getStatus());
            map.put("order_totalNum", o.getTotalQuantity() == null ? "" : o.getTotalQuantity().toString());// 订单总件数
            map.put("order_totalPrice", o.getActualPrice() == null ? "" : o.getActualPrice());//订单总额 实际的
            map.put("order_psf", "0");// 配送费
            
            List<OrderGood> olist =  orderMapper.findGoodsByOrderId(o.getId());
//            List<OrderGood> olist = o.getOrderGoodsList();
            map.put("order_goods_size", olist.size());// 
            List<Object> newObjList = new ArrayList<Object>();
            Map<String, Object> omap = null;
            // map.put("goods_list_size", olist.size());
            if (olist.size() > 0) {
                for (OrderGood od : olist) {
                    omap = new HashMap<String, Object>();
                    omap.put("good_id",  od.getGood() == null ? "" : od.getGood().getId()==null?"":od.getGood().getId());
                    omap.put("good_volume_number",  od.getGood() == null ? "" : od.getGood().getVolumeNumber()==null?"":od.getGood().getVolumeNumber());//热销量
                    omap.put("good_price", od.getActualPrice() == null ? "" : od.getActualPrice());//商品单价
//                    omap.put("good_price", od.getPrice() == null ? "" : od.getPrice()+"");
                    omap.put("good_num", od.getQuantity() == null ? "" : od.getQuantity()+"");
                    omap.put("good_name", od.getGood() == null ? "" : od.getGood().getTitle()==null?"":od.getGood().getTitle());
                    String brand = od.getGood() == null ? "" : od.getGood().getGoodsBrand() == null ? "" : od.getGood().getGoodsBrand().getName();
                    String type = od.getGood() == null ? "" : od.getGood().getModelNumber() == null ? "" : od.getGood().getModelNumber();
                    omap.put("good_brand", brand+" "+type);//品牌型号
                    omap.put("good_channel", od.getPayChannel() == null ? "" : od.getPayChannel().getName()==null?"":od.getPayChannel().getName());
                    String good_logo = "";
                    if (null != od.getGood()) {
                        Good g = od.getGood();
                        Integer gid = g.getId();
                        List<GoodsPicture> list = orderMapper.findPicByGoodId(gid);
                        if (list.size() > 0) {
                            GoodsPicture gp = list.get(0);
                            good_logo = gp.getUrlPath()==null?"":filePath +gp.getUrlPath();
                        }
                    }
                    omap.put("good_logo", good_logo);
                    newObjList.add(omap);
                }
                map.put("order_goodsList", newObjList);
            }else{
            	  map.put("order_goodsList", newObjList);
            }
            obj_list.add(map);
        }
        return obj_list;
    }

    /**
     * 订单详情
     * 
     * @param id
     * @return
     * @throws ParseException
     */
    public Object findMyOrderById(Integer id) throws ParseException {
        Order o = orderMapper.findMyOrderById(id);
        List<Object> obj_list = new ArrayList<Object>();
        Map<String, Object> map = new HashMap<String, Object>();
        // String oid = o.getId()==null ?"":o.getId().toString();
        map.put("order_id", id);
 
        map.put("order_type", o.getTypes()==null?"":o.getTypes()+"");
        map.put("order_number", o.getOrderNumber()==null?"":o.getOrderNumber());//订单编号
//        map.put("order_payment_type", o.getOrderPayment()==null ?"":o.getOrderPayment().getPayType().getName());//支付方式
        map.put("order_payment_type", o.getOrderPayment()==null ?"":o.getOrderPayment().getPayType());//支付方式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
 
        String d = sdf.format(o.getCreatedAt());
        map.put("order_createTime", d);// 订单日期
        // map.put("order_pay_status", o.getPayStatus().getName());
        map.put("order_status", o.getStatus());
        map.put("need_invoice", o.getNeedInvoice()+"");//是否需要显示开票信息  1需要 0 不需要
        map.put("order_totalNum", o.getTotalQuantity() == null ? "" : o.getTotalQuantity().toString());// 订单总件数
        map.put("order_totalprice", o.getActualPrice() + "");// 订单总额
        map.put("order_oldprice", o.getTotalPrice() + "");// 订单原价
        map.put("order_psf", "0");// 配送费
        String lg_name =  o.getOrderLogistic()==null?"":o.getOrderLogistic().getLogisticsName();  //快递公司
        String lg_number =  o.getOrderLogistic()==null?"": o.getOrderLogistic().getLogisticsNumber();//快递单号
        map.put("logistics_name", lg_name);
        map.put("logistics_number", lg_number);
        map.put("order_receiver", o.getCustomerAddress() == null ? "" : o.getCustomerAddress().getReceiver());
        map.put("order_address", o.getCustomerAddress() == null ? "" : o.getCustomerAddress().getAddress());
        map.put("order_receiver_phone", o.getCustomerAddress() == null ? "" : o.getCustomerAddress().getMoblephone());
        map.put("order_comment", o.getComment() == null ? "" : o.getComment());// 留言
        Integer invoce_type = o.getInvoiceType();
        String invoce_name = "";
        if (null != invoce_type && invoce_type == 1) {// 个人
            invoce_name = "个人";
        } else if (null != invoce_type && invoce_type == 0) {// 公司
            invoce_name = "公司";
        }
        map.put("order_invoce_type", invoce_name);// 发票类型
        map.put("order_invoce_info", o.getInvoiceInfo()==null?"":o.getInvoiceInfo());// 发票抬头
        List<OrderGood> olist = o.getOrderGoodsList();
        List<Object> newObjList = new ArrayList<Object>();
        map.put("order_goods_size", olist.size());// 
        Map<String, Object> omap = null;
        if (olist.size() > 0) {
            OrderGood og = olist.get(0);
            StringBuffer sb = new StringBuffer();
            map.put("good_merchant", og.getGood() == null ? "" : og.getGood().getFactory() == null ? "" : og.getGood().getFactory().getName() == null ? "" : og.getGood().getFactory().getName());// 供货商
            for (OrderGood od : olist) {
                omap = new HashMap<String, Object>();
                // omap.put("order_good_id", od.getId().toString());
                String good_id = od.getGood() == null ? "" : od.getGood().getId() == null ? "" : od.getGood().getId().toString();
                omap.put("good_id", good_id);
                omap.put("good_actualprice", od.getActualPrice() == null ? "" : od.getActualPrice());//商品单价
//                omap.put("good_price", od.getPrice() == null ? "" : od.getPrice() + "");
                omap.put("good_num", od.getQuantity() == null ? "" : od.getQuantity() + "");
                omap.put("good_name", od.getGood() == null ? "" : od.getGood().getTitle() == null ? "" : od.getGood().getTitle());
                String brand = od.getGood() == null ? "" : od.getGood().getGoodsBrand() == null ? "" : od.getGood().getGoodsBrand().getName();
                String type = od.getGood() == null ? "" : od.getGood().getModelNumber() == null ? "" : od.getGood().getModelNumber();
                omap.put("good_brand", brand+" "+type);//品牌型号
                omap.put("good_channel", od.getPayChannel() == null ? "" : od.getPayChannel().getName() == null ? "" : od.getPayChannel().getName());
//                if (good_id != "") {
//                    List<Terminal> terminals = orderMapper.getTerminsla(id, Integer.valueOf(good_id));
//                     sb = new StringBuffer();
//                    for (Terminal t : terminals) {
//                        sb.append(t.getSerialNum() + " , ");
//                    }
//                }  
                String good_logo = "";
                if (null != od.getGood()) {
                    Good g = od.getGood();
                    if (g.getPicsList().size() > 0) {
                        GoodsPicture gp = g.getPicsList().get(0);
                        good_logo = filePath + gp.getUrlPath();
                    }
                }
                omap.put("good_logo", good_logo);
                newObjList.add(omap);
            }
            List<Terminal> terminals = orderMapper.getTerminsla(id, null);
	        for (Terminal t : terminals) {
	        	String r2 = t.getReserver2();
	        	if(!StringUtils.isBlank(r2)){
	        		r2 = "("+r2+")";
	        	}
	            sb.append(" "+ t.getSerialNum()+r2 );
	        }
            map.put("terminals", sb.toString().trim());
        }
        map.put("order_goodsList", newObjList);
        MyOrderReq myOrderReq = new MyOrderReq();
        myOrderReq.setId(id);
        List<Map<String, Object>> list = orderMapper.findTraceById(myOrderReq);
        map.put("comments", OrderUtils.getTraceByVoId(myOrderReq, list));
        obj_list.add(map);
        return obj_list;
    }

    //取消订单 返回库存
    @Transactional(value = "transactionManager-zhangfu")
    public void cancelMyOrder(MyOrderReq myOrderReq) {
        myOrderReq.setOrderStatus(OrderStatus.CANCEL);
        orderMapper.changeStatus(myOrderReq);
    	List<Map<String, Object>> o = orderMapper.findOrderById(myOrderReq);
    	for(Map<String,Object> oo :o){
    		 String good_id = oo.get("good_id")==null?"":oo.get("good_id").toString();
             String quantity = oo.get("quantity")==null?"":oo.get("quantity").toString();
             if(good_id !="" && quantity!=""){
                 orderMapper.update_goods_stock(good_id,quantity);
             }
    	}
    }

    public void comment(MyOrderReq myOrderReq) {
        myOrderReq.setOrderStatus(OrderStatus.EVALUATED);
        orderMapper.changeStatus(myOrderReq);
        orderMapper.comment(myOrderReq);
    }

    public Page<Object> orderSearch(MyOrderReq myOrderReq) {
        PageRequest request = new PageRequest(myOrderReq.getPage(), myOrderReq.getRows());
        int count = orderMapper.countOrderSearch(myOrderReq);
        List<Order> centers = orderMapper.orderSearch(myOrderReq);
        List<Object> obj_list = putDate(centers);
        return new Page<Object>(request, obj_list, count);
    }

    public int batchSaveComment(MyOrderReq myOrderReq) {
      int i =   orderMapper.batchSaveComment(myOrderReq.getJson());
      if(i>0){
    	  myOrderReq.setOrderStatus(OrderStatus.EVALUATED);
          int j = orderMapper.changeStatus(myOrderReq);
          return j;
      }
      return i;
    }

    @Transactional(value = "transactionManager-zhangfu")
    public void cleanOrder() {
    	logger.debug("进入订单清理");
        List<Map<String, Object>>  m = orderMapper.findPersonGoodsQuantity();
        if(m.size()<1){
        	logger.debug("没有找到需要清理的订单");
        }else{
        	logger.debug("清理订单开始");
            orderMapper.cleanOrder();
        }
        for(Map<String, Object> mm :m){
            String good_id = mm.get("good_id")==null?"":mm.get("good_id").toString();
            String quantity = mm.get("quantity")==null?"":mm.get("quantity").toString();
            logger.debug("订单清理start==id=>>>"+good_id+"==库存==>>>"+quantity);
            if(good_id !="" && quantity!=""){
                orderMapper.update_goods_stock(good_id,quantity);
            }
        }
       
    }

	public Map<String, Object> findMyOrderById2(Integer id) {
		Order o = orderMapper.findMyOrderById(id);
//        List<Object> obj_list = new ArrayList<Object>();
        Map<String, Object> map = new HashMap<String, Object>();
        // String oid = o.getId()==null ?"":o.getId().toString();
        map.put("order_id", id);
 
        map.put("order_type", o.getTypes()==null?"":o.getTypes()+"");
        map.put("order_number", o.getOrderNumber()==null?"":o.getOrderNumber());//订单编号
//        map.put("order_payment_type", o.getOrderPayment()==null ?"":o.getOrderPayment().getPayType().getName());//支付方式
        map.put("order_payment_type", o.getOrderPayment()==null ?"":o.getOrderPayment().getPayType());//支付方式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
 
        String d = sdf.format(o.getCreatedAt());
        map.put("order_createTime", d);// 订单日期
        // map.put("order_pay_status", o.getPayStatus().getName());
        map.put("order_status", o.getStatus());
        map.put("need_invoice", o.getNeedInvoice()+"");//是否需要显示开票信息  1需要 0 不需要
        map.put("order_totalNum", o.getTotalQuantity() == null ? "" : o.getTotalQuantity().toString());// 订单总件数
        map.put("order_totalprice", o.getActualPrice() + "");// 订单总额
        map.put("order_oldprice", o.getTotalPrice() + "");// 订单原价
        map.put("order_psf", "0");// 配送费
        map.put("order_receiver", o.getCustomerAddress() == null ? "" : o.getCustomerAddress().getReceiver());
        map.put("order_address", o.getCustomerAddress() == null ? "" : o.getCustomerAddress().getAddress());
        map.put("order_receiver_phone", o.getCustomerAddress() == null ? "" : o.getCustomerAddress().getMoblephone());
        map.put("order_comment", o.getComment() == null ? "" : o.getComment());// 留言
        Integer invoce_type = o.getInvoiceType();
        String invoce_name = "";
        if (null != invoce_type && invoce_type == 1) {// 个人
            invoce_name = "个人";
        } else if (null != invoce_type && invoce_type == 0) {// 公司
            invoce_name = "公司";
        }
        map.put("order_invoce_type", invoce_name);// 发票类型
        map.put("order_invoce_info", o.getInvoiceInfo()==null?"":o.getInvoiceInfo());// 发票抬头
        List<OrderGood> olist = o.getOrderGoodsList();
        List<Object> newObjList = new ArrayList<Object>();
        map.put("order_goods_size", olist.size());// 
        Map<String, Object> omap = null;
        if (olist.size() > 0) {
            OrderGood og = olist.get(0);
            map.put("good_merchant", og.getGood() == null ? "" : og.getGood().getFactory() == null ? "" : og.getGood().getFactory().getName() == null ? "" : og.getGood().getFactory().getName());// 供货商
            StringBuffer sb = null;
            for (OrderGood od : olist) {
                omap = new HashMap<String, Object>();
                // omap.put("order_good_id", od.getId().toString());
                String good_id = od.getGood() == null ? "" : od.getGood().getId() == null ? "" : od.getGood().getId().toString();
                omap.put("good_id", good_id);
                omap.put("good_actualprice", od.getActualPrice() == null ? "" : od.getActualPrice());//商品单价
//                omap.put("good_price", od.getPrice() == null ? "" : od.getPrice() + "");
                omap.put("good_num", od.getQuantity() == null ? "" : od.getQuantity() + "");
                omap.put("good_name", od.getGood() == null ? "" : od.getGood().getTitle() == null ? "" : od.getGood().getTitle());
                String brand = od.getGood() == null ? "" : od.getGood().getGoodsBrand() == null ? "" : od.getGood().getGoodsBrand().getName();
                String type = od.getGood() == null ? "" : od.getGood().getModelNumber() == null ? "" : od.getGood().getModelNumber();
                omap.put("good_brand", brand+" "+type);//品牌型号
                omap.put("good_channel", od.getPayChannel() == null ? "" : od.getPayChannel().getName() == null ? "" : od.getPayChannel().getName());
                if (good_id != "") {
                    List<Terminal> terminals = orderMapper.getTerminsla(id, Integer.valueOf(good_id));
                     sb = new StringBuffer();
                    for (Terminal t : terminals) {
                    	String r2 = t.getReserver2();
        	        	if(!StringUtils.isBlank(r2)){
        	        		r2 = "("+r2+")";
        	        	}
                        sb.append(" "+t.getSerialNum()+r2 );
                    }
                }  
                String good_logo = "";
                if (null != od.getGood()) {
                    Good g = od.getGood();
                    if (g.getPicsList().size() > 0) {
                        GoodsPicture gp = g.getPicsList().get(0);
                        good_logo = filePath + gp.getUrlPath();
                    }
                }
                omap.put("good_logo", good_logo);
                newObjList.add(omap);
            }
            map.put("terminals", sb.toString().trim());
        }

        map.put("order_goodsList", newObjList);
        MyOrderReq myOrderReq = new MyOrderReq();
        myOrderReq.setId(id);
        List<Map<String, Object>> list = orderMapper.findTraceById(myOrderReq);
        map.put("comments", OrderUtils.getTraceByVoId(myOrderReq, list));
        return map;
	}
    
}
