package com.comdosoft.financial.user.utils;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;




import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 系统工具类<br>
 * <功能描述>
 *
 * @author shine 2014年8月13日
 *
 */
public class SysUtils {

    /**
     * 将json字符串转换成java对象
     * 
     * @param json
     * @param object
     * @return
     */
    public static Object parseJSONStringToObject(String json, Object object) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(json, object.getClass());
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 将json字符串转换成List
     * 
     * @param json
     * @param object
     * @return
     */
    public static List<?> parseJSONStringToList(String json, Class<?> object) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(json, mapper.getTypeFactory().constructParametricType(List.class, object));
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 将java对象转换成json字符串
     * 
     * @param object
     * @return
     */
    public static String parseObjectToJSONString(Object object) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 截取字符串的前limit个字符
     *
     * @param string
     *            原字符串
     * @param limit
     *            截取长度
     * @return String
     */
    public static String substring(String string, int limit) {
        StringBuffer returnString = new StringBuffer();
        if (string == null || limit <= 0 || limit > string.length()) {
            return string;
        }
        char[] temp = string.toCharArray();
        for (int i = 0; i < limit; i++) {
            returnString.append(temp[i]);
        }
        return returnString.toString();
    }

    /**
     * 随机产生N位验证码
     * 
     * @return
     */
    public static char[] getRandNum(int n) {
        char[] rand = new char[n];
        String str = "123456789qwertyuipkjhgfdsaxcvbnmQWERTYUIPLKJHGFDSAXCVBNM";
        for (int i = 0; i < n; i++) {
            Random rd = new Random();
            int index = rd.nextInt(str.length());

            // 通过下标获取字符
            rand[i] = str.charAt(index);
        }
        return rand;
    }

    /**
     * 生成图片 - 验证码
     * 
     * @param randNum
     *            验证码
     * @return
     */
    public static BufferedImage generateRandImg(char[] randNum) {

        // 在内存中创建图象
        int width = 60, height = 30;

        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        // 获取图形上下文
        Graphics g = image.getGraphics();

        // 生成随机类
        Random random = new Random();

        // 设定背景色
        g.setColor(getRandColor(200, 250));

        g.fillRect(0, 0, width, height);

        // 设定字体
        g.setFont(new Font("Times New Roman", Font.PLAIN, 18));

        // 画边框
        // g.setColor(new Color());
        // g.drawRect(0,0,width-1,height-1);

        // 随机产生160条干扰线，使图象中的认证码不易被其它程序探测到
        g.setColor(getRandColor(160, 200));
        for (int i = 0; i < 160; i++) {
            int x = random.nextInt(width);
            int y = random.nextInt(height);
            int xl = random.nextInt(12);
            int yl = random.nextInt(12);
            g.drawLine(x, y, x + xl, y + yl);
        }

        String strRandNum = "";
        for (int i = 0; i < 4; i++) {// 取出验证码(4位数字)
            strRandNum = Character.toString(randNum[i]);
            g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
            g.drawString(strRandNum, 13 * i + 6, 20);// 将验证码显示到图象中
        }

        // 图象生效
        g.dispose();

        return image;
    }

    /**
     * 获得随机图片颜色
     * 
     * @param fc
     * @param bc
     * @return
     */
    private static Color getRandColor(int fc, int bc) {
        Random random = new Random();
        if (fc > 255) {
            fc = 255;
        }
        if (bc > 255) {
            bc = 255;
        }
        int r = fc + random.nextInt(bc - fc);
        int g = fc + random.nextInt(bc - fc);
        int b = fc + random.nextInt(bc - fc);
        return new Color(r, g, b);
    }
    
    /**
     * 生成订单
     * author jwb
     * @param type 订单类型：0 在线购买，1 代购，2 批购，3 租赁
     * @return
     */
    public static String getOrderNum(int type){
        SimpleDateFormat sdf = new SimpleDateFormat("YYYYMMddHHmmssSSS");
        return type+sdf.format(new Date());
    }
    
    /**
     * author jwb
     * @param arry
     * @return
     */
    public static String Arry2Str(int[] arry){
        StringBuilder sb=new StringBuilder();
        if(arry!=null&&arry.length>0){
            sb.append("(");
            for (Object object : arry) {
                sb.append(object+",");
            }
            sb.deleteCharAt(sb.length()-1);
            sb.append(")");
        }
        return sb.toString();
    }
    
    /**
     * author jwb
     * @param arry
     * @return
     */
    public static String Arry2Str(String[] arry){
        StringBuilder sb=new StringBuilder();
        if(arry!=null&&arry.length>0){
            sb.append("(");
            for (Object object : arry) {
                sb.append(object+",");
            }
            sb.deleteCharAt(sb.length()-1);
            sb.append(")");
        }
        return sb.toString();
    }
    /**
     * author jwb
     * @param s
     * @return
     */
    public static int String2int(String s){
        try {
            return Integer.valueOf(s.trim());
        } catch (Exception e) {
            return 0;
        }
    }
}