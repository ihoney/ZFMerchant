package com.comdosoft.financial.user.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.mapper.zhangfu.IndexMapper;
@Service
public class IndexService {
    
    @Resource
    private IndexMapper indexMapper;

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
            map.put("logo_file_path", m.get("logo_file_path")==null?"":m.get("logo_file_path"));
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
        List<Map<String, Object>> newlist = new ArrayList<Map<String,Object>>();
        Map<String,Object> map = null;
        for(Map<String,Object> m: list){
            map = new HashMap<String,Object>();
            String id =  m.get("id")==null?"":m.get("id").toString();
            map.put("id", id);
            map.put("brand_number", m.get("brand_number")==null?"":m.get("brand_number"));
            map.put("volume_number", m.get("volume_number")==null?"":m.get("volume_number"));
            map.put("title", m.get("title")==null?"":m.get("title"));
            map.put("brand_name", m.get("brand_name")==null?"": m.get("brand_name"));
            map.put("good_logo", m.get("url_path")==null?"": m.get("url_path"));
            newlist.add(map);
        }
        return newlist;
    }

    public List<Map<String, Object>> findAllCity() {
        List<Map<String, Object>> parent_list = indexMapper.getParentCitiesList();
        List<Map<String, Object>> newlist = new ArrayList<Map<String,Object>>();
        Map<String,Object> map = null;
        for(Map<String,Object> m: parent_list){
            map = new HashMap<String,Object>();
            String id =  m.get("id")==null?"":m.get("id").toString();
            map.put("id", id);
            map.put("name", m.get("name")==null?"":m.get("name"));
            List<Map<String, Object>> children_list = indexMapper.getChildrenCitiesList(id);
            List<Map<String, Object>> new_children_list = new ArrayList<Map<String,Object>>();
            Map<String,Object> cmap = null;
            for(Map<String,Object> c:children_list){
                cmap = new HashMap<String,Object>();
                String cid =  c.get("id")==null?"":c.get("id").toString();
                cmap.put("id", cid);
                cmap.put("name", c.get("name")==null?"":c.get("name"));
                new_children_list.add(cmap);
            }
            map.put("childrens",new_children_list );
            newlist.add(map);
        }
        return newlist;
    }

}
