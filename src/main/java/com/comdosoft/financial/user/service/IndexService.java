package com.comdosoft.financial.user.service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.query.MailReq;
import com.comdosoft.financial.user.domain.zhangfu.AppVersion;
import com.comdosoft.financial.user.domain.zhangfu.GoodsPicture;
import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.mapper.zhangfu.IndexMapper;
import com.comdosoft.financial.user.mapper.zhangfu.OrderMapper;
import com.comdosoft.financial.user.utils.SysUtils;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
@Service
public class IndexService {
    private static final Logger logger = LoggerFactory.getLogger(IndexService.class);
    @Resource
    private IndexMapper indexMapper;
    @Resource
    private OrderMapper orderMapper;
    @Resource
    private MailService mailService;
    
    @Value("${filePath}")
    private String filePath;
    
    public List<Map<String, Object>> getFactoryList() {
        List<Map<String, Object>> list = indexMapper.getFactoryList();
        List<Map<String, Object>> newlist = new ArrayList<Map<String,Object>>();
        Map<String,Object> map = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
        for(Map<String,Object> m: list){
            map = new HashMap<String,Object>();
            try {
                String d = (m.get("created_at")+"");
                Date date = sdf.parse(d);
                String c_date = sdf.format(date);
                map.put("created_at", c_date);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            map.put("logo_file_path", m.get("logo_file_path")==null?"":filePath+m.get("logo_file_path"));
            map.put("name", m.get("name")==null?"":m.get("name"));
            String des =  m.get("description")==null?"":m.get("description").toString();
            if(des.length()>12){
                des = des.substring(0, 12)+"...";
            }
            map.put("description",des);
            map.put("website_url", m.get("website_url")==null?"": m.get("website_url"));
            newlist.add(map);
        }
        return newlist;
    }

    public List<Map<String, Object>> getPosList() {
        List<Map<String, Object>> list = indexMapper.getPosList();
        List<Map<String, Object>> newlist = new LinkedList<Map<String,Object>>();
        System.err.println();
        Map<String,Object> map = null;
        for(Map<String,Object> m: list){
            map = new HashMap<String,Object>();
            String id =  m.get("id")==null?"":m.get("id").toString();
            String pgid =  m.get("pgid")==null?"":m.get("pgid").toString();
            logger.debug("id>>"+id+"pgid>>>>"+pgid+"  urlpath>>>"+m.get("url_path"));
            map.put("id", id);
            map.put("title", m.get("title")==null?"":m.get("title"));
            map.put("retail_price", m.get("retail_price")==null?"":m.get("retail_price"));
            map.put("second_title", m.get("second_title")==null?"": m.get("second_title"));
            map.put("good_logo", m.get("url_path")==null?"": filePath+m.get("url_path"));
            newlist.add(map);
        }
        return newlist;
    }
    
    public List<Map<String, Object>> getPosList2() {
        List<Map<String, Object>> list = indexMapper.getPosList2();
        List<Map<String, Object>> newlist = new LinkedList<Map<String,Object>>();
        Map<String,Object> map = null;
        for(Map<String,Object> m: list){
            map = new HashMap<String,Object>();
            String id =  m.get("id")==null?"":m.get("id").toString();
            map.put("id", id);
            map.put("title", m.get("title")==null?"":m.get("title"));
            map.put("retail_price", m.get("retail_price")==null?"":m.get("retail_price"));
            map.put("second_title", m.get("second_title")==null?"": m.get("second_title"));
            List<GoodsPicture> pglist = orderMapper.findPicByGoodId(Integer.parseInt(id));
            String good_logo ="";         
            if (pglist.size() > 0) {
                GoodsPicture gp = pglist.get(0);
                 good_logo = gp.getUrlPath()==null?"":filePath +gp.getUrlPath();
            }
            map.put("good_logo", good_logo);
            newlist.add(map);
        }
        return newlist;
    }

    public List<Map<String, Object>> findAllCity() {
    	   List<Map<String, Object>> parent_list = indexMapper.getAllCitiesList(); 
           Map<String,Object> map = null; 
           List<Map<String, Object>> newlist = new ArrayList<Map<String,Object>>(); 
           List<Map<String, Object>> new_children_list =null; 
           Map<String,Object>  cmap = null; 
           Map<String,Object> mm = new HashMap<String,Object>(); 
           for(Map<String,Object> m: parent_list){
           	String pid =  m.get("pid")==null?"":m.get("pid").toString();
           	if(!mm.containsKey(pid)){
   	        	map = new HashMap<String,Object>();
   	            map.put("id", pid);
   	            map.put("name", m.get("pname")==null?"":m.get("pname"));
   	            new_children_list = new ArrayList<Map<String,Object>>(); 
   	            for(Map<String,Object> n: parent_list){
   	            	cmap = new HashMap<String,Object>();
   	            	String p_id = n.get("pid")==null?"":n.get("pid").toString();
   	            	if(p_id.equals(pid)){
   	            		  String cid =  n.get("cid")==null?"":n.get("cid").toString();
   	                      cmap.put("id", cid);
   	                      cmap.put("name", n.get("cname")==null?"":n.get("cname"));
   	                      new_children_list.add(cmap);
   	            	}
   	            }
   	            map.put("childrens",new_children_list );
   	            newlist.add(map);
   	            mm.put(pid, pid);
           	}
           }
           return newlist;
    }

    
    
    public String  getPhoneCode(MyOrderReq req) {
        String phone = req.getPhone();
        String code = SysUtils.getCode();
        if(SysUtils.isMobileNO(phone)){
            try {
                Boolean b = SysUtils.sendPhoneCode("感谢您使用华尔街金融，您的验证码为："+code, phone);
                if(!b) return "-1";
            } catch (JsonParseException e) {
                e.printStackTrace();
            } catch (JsonMappingException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return code;
    }

    public void changePhone(MyOrderReq req) {
        indexMapper.changePhone(req);
    }

    public void change_email(HttpServletRequest request, MyOrderReq myOrderReq) {
        String   url  = request.getScheme()+"://";  
        String name = myOrderReq.getQ();
        String id = myOrderReq.getId().toString();
        url+=request.getHeader("host");   
        url+=request.getContextPath();      
        MailReq req = new MailReq();
        req.setUserName(myOrderReq.getQ());//姓名
        req.setAddress(myOrderReq.getContent());//邮箱
        String data;
        try {
             data = SysUtils.string2MD5(name+"zf_vc");  ///#/myinfobase
            req.setUrl("<a href='"+url+"/#/myinfobase?id="+id+"&q="+data+"'>点击修改</a>");
            mailService.sendMail(req);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

	public String update_email(MyOrderReq myOrderReq) {
	        MailReq req = new MailReq();
	        req.setUserName(myOrderReq.getUserName());//姓名
	        req.setAddress(myOrderReq.getEmail());//邮箱
	        try {
	        	String code = SysUtils.getCode() ;
	            mailService.sendMail_phone(req,code,"修改邮箱");
	            return code;
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return "";
	}

	public AppVersion getVersion(AppVersion app) {
		AppVersion list = indexMapper.getVersion(app);
		return list;
	}

}
