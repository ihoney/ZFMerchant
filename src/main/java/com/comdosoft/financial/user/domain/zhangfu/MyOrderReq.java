package com.comdosoft.financial.user.domain.zhangfu;

import java.util.Arrays;

public class MyOrderReq {
    private Integer id;//业务id
    private String[] ids;
    private Integer page ;//当前页数
    private Integer pageSize ;//每页大小
    private Integer customer_id;//用户id
    private PayType payType;
    private OrderStatus orderStatus;
    private RepairStatus repairStatus;
    
    
    /**  
     * 获取 repairStatus  
     * @return repairStatus
     */
    public RepairStatus getRepairStatus() {
        return repairStatus;
    }
    /**  
     * 设置 repairStatus  
     * @param repairStatus
     */
    public void setRepairStatus(RepairStatus repairStatus) {
        this.repairStatus = repairStatus;
    }
    /**  
     * 获取 customer_id  
     * @return customer_id
     */
    public Integer getCustomer_id() {
        return customer_id;
    }
    /**  
     * 设置 customer_id  
     * @param customer_id
     */
    public void setCustomer_id(Integer customer_id) {
        this.customer_id = customer_id;
    }
    /**  
     * 获取 orderStatus  
     * @return orderStatus
     */
    public OrderStatus getOrderStatus() {
        return orderStatus;
    }
    /**  
     * 设置 orderStatus  
     * @param orderStatus
     */
    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }
    /**  
     * 获取 payStatus  
     * @return payStatus
     */
    public PayType getPayStatus() {
        return payType;
    }
    /**  
     * 设置 payStatus  
     * @param payType
     */
    public void setPayStatus(PayType payType) {
        this.payType = payType;
    }
    /**  
     * 获取 ids  
     * @return ids
     */
    public String[] getIds() {
        return ids;
    }
    /**  
     * 设置 ids  
     * @param ids
     */
    public void setIds(String[] ids) {
        this.ids = ids;
    }
    /**  
     * 获取 id  
     * @return id
     */
    public Integer getId() {
        return id;
    }
    /**  
     * 设置 id  
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }
    /**  
     * 获取 page  
     * @return page
     */
    public Integer getPage() {
        if(null == page) page = 0;
        return page;
    }
    /**  
     * 设置 page  
     * @param page
     */
    public void setPage(Integer page) {
        this.page = page;
    }
    /**  
     * 获取 pageSize  
     * @return pageSize
     */
    public Integer getPageSize() {
        if(null == pageSize) pageSize = 20;
        return pageSize;
    }
    /**  
     * 设置 pageSize  
     * @param pageSize
     */
    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }
    
   
    /**  
     * 获取 payType  
     * @return payType
     */
    public PayType getPayType() {
        return payType;
    }
    /**  
     * 设置 payType  
     * @param payType
     */
    public void setPayType(PayType payType) {
        this.payType = payType;
    }
    public MyOrderReq() {
        super();
    }
    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "MyOrderReq [id=" + id + ", ids=" + Arrays.toString(ids) + ", page=" + page + ", pageSize=" + pageSize + ", customer_id=" + customer_id + ", payType=" + payType + ", orderStatus=" + orderStatus + ", repairStatus=" + repairStatus + "]";
    }

}