package com.comdosoft.financial.user.domain;

public class MyOrderReq {
    private Integer id;
    private String[] ids;
    private Integer page;//当前页数
    private Integer pageSize ;//每页大小
    private String customers_id;//用户id
    
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
     * 获取 customers_id  
     * @return customers_id
     */
    public String getCustomers_id() {
        return customers_id;
    }
    /**  
     * 设置 customers_id  
     * @param customers_id
     */
    public void setCustomers_id(String customers_id) {
        this.customers_id = customers_id;
    }
    public MyOrderReq() {
        super();
    }
    
    

}
