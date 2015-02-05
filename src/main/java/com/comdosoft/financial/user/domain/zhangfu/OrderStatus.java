package com.comdosoft.financial.user.domain.zhangfu;

public enum OrderStatus {
    UNPAID(-1,"未付款"),PAID(1,"已付款"),SHIPPED(2,"已发货"),EVALUATED(3,"已评价"),CANCEL(-2,"已取消"),CLOSED(0,"交易关闭");
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
    private OrderStatus(Integer code, String name) {
        this.code = code;
        this.name = name;
    }
   
    
}
