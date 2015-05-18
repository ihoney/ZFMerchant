package com.comdosoft.financial.user.domain.zhangfu;

public class CommentsJson {
    private Integer customer_id;
    private Integer good_id;
    private Integer order_id;
    private Integer score;
    private String content;
    private String customer_name;
   
	/**
	 * @return the order_id
	 */
	public Integer getOrder_id() {
		return order_id;
	}
	/**
	 * @param order_id the order_id to set
	 */
	public void setOrder_id(Integer order_id) {
		this.order_id = order_id;
	}
	/**
	 * @return the customer_name
	 */
	public String getCustomer_name() {
		return customer_name;
	}
	/**
	 * @param customer_name the customer_name to set
	 */
	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
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
     * 获取 good_id  
     * @return good_id
     */
    public Integer getGood_id() {
        return good_id;
    }
    /**  
     * 设置 good_id  
     * @param good_id
     */
    public void setGood_id(Integer good_id) {
        this.good_id = good_id;
    }
    /**  
     * 获取 score  
     * @return score
     */
    public Integer getScore() {
        return score;
    }
    /**  
     * 设置 score  
     * @param score
     */
    public void setScore(Integer score) {
        this.score = score;
    }
    /**  
     * 获取 content  
     * @return content
     */
    public String getContent() {
        return content;
    }
    /**  
     * 设置 content  
     * @param content
     */
    public void setContent(String content) {
        this.content = content;
    }
 
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "CommentsJson [customer_id=" + customer_id + ", good_id="
				+ good_id + ", order_id=" + order_id + ", score=" + score
				+ ", content=" + content + ", customer_name=" + customer_name
				+ "]";
	}
	public CommentsJson(Integer customer_id, Integer good_id, Integer order_id,
			Integer score, String content, String customer_name) {
		super();
		this.customer_id = customer_id;
		this.good_id = good_id;
		this.order_id = order_id;
		this.score = score;
		this.content = content;
		this.customer_name = customer_name;
	}
	public CommentsJson() {
		super();
	}
 
    
    
}
