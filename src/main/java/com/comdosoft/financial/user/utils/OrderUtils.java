package com.comdosoft.financial.user.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.comdosoft.financial.user.domain.zhangfu.MyOrderReq;
import com.comdosoft.financial.user.utils.page.Page;
import com.comdosoft.financial.user.utils.page.PageRequest;

public class OrderUtils {

    /**
     * 获取追踪记录
     * @param myOrderReq
     * @param list
     * @return
     * @throws ParseException
     */
    public static Page<List<Object>> getTraceByVoId(MyOrderReq myOrderReq, List<Map<String,Object>> list) throws ParseException {
        PageRequest request = new PageRequest(myOrderReq.getPage(), myOrderReq.getPageSize());
        SimpleDateFormat sdf = null;
        Map<String,Object> childrenMap = null;
        List<Map<String,Object>> childrenList = new LinkedList<Map<String,Object>>();
        for(Map<String,Object> m:list){
            childrenMap = new HashMap<String,Object>();
            sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String created_at =   m.get("created_at")+"";
            String content = m.get("marks_content")+"";
            String person = m.get("marks_person")+"";
            childrenMap.put("marks_time", sdf.format(sdf.parse(created_at)));
            childrenMap.put("marks_content", content);
            childrenMap.put("marks_person", person);
            childrenList.add(childrenMap);
        }
        return new Page<List<Object>>(request, childrenList);
    }
}
