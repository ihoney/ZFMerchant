package com.comdosoft.financial.user.domain.zhangfu;

/**
 * 
 * 维修状态<br>
 * <功能描述>
 *
 * @author gch 2015年2月9日
 *
 */
public enum RepairStatus {
    /**
     * 未付款
     */
    UNPAID(1,"未付款"),
    /**
     * 待发回
     */
    PAID(2,"待发回"),
    /**
     * 维修中
     */
    SHIPPED(3,"维修中"),
    /**
     * 处理完成
     */
    EVALUATED(4,"处理完成"),
    /**
     * 已取消
     */
    CANCEL(5,"已取消");

    private Integer code;
    private String name;
    /**  
     * 获取 name  
     * @return name
     */
    public String getName() {
        return name;
    }
    /**  
     * 设置 name  
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }
    /**  
     * 获取 code  
     * @return code
     */
    public Integer getCode() {
        return code;
    }
    /**  
     * 设置 code  
     * @param code
     */
    public void setCode(Integer code) {
        this.code = code;
    }
    private RepairStatus(Integer code, String name) {
        this.code = code;
        this.name = name;
    }
    
    public static String getName(int code){
        String status_name = null;
        for (RepairStatus s : RepairStatus.values()){  
            if(s.getCode() == code){
                status_name = s.getName();
            }
        }
        return status_name;
    }
}
