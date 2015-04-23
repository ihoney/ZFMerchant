package com.comdosoft.financial.user.domain.zhangfu;

import java.util.Date;

public class OpeningApplie {

	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column opening_applies.id
	 * @mbggenerated
	 */
	private Integer id;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column opening_applies.apply_customer_id
	 * @mbggenerated
	 */
	private Integer applyCustomerId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column opening_applies.preliminary_verify_user_id
	 * @mbggenerated
	 */
	private Integer preliminaryVerifyUserId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column opening_applies.terminal_id
	 * @mbggenerated
	 */
	private Integer terminalId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column opening_applies.status
	 * @mbggenerated
	 */
	private Integer status;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column opening_applies.created_at
	 * @mbggenerated
	 */
	private Date createdAt;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column opening_applies.updated_at
	 * @mbggenerated
	 */
	private Date updatedAt;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column opening_applies.opening_apply_mark_id
	 * @mbggenerated
	 */
	private Integer openingApplyMarkId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column opening_applies.types
	 * @mbggenerated
	 */
	private Integer types;

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column opening_applies.id
	 * @return  the value of opening_applies.id
	 * @mbggenerated
	 */
	
	private Integer merchantId;
	
	private String merchantName;
	
	private Integer sex;
	
	private Date birthday;
	
	private String cardId;
	
	private String phone;
	
	private String email;
	
	private Integer cityId; 
	
	private String name;
	
	private Integer payChannelId;
	
	private String accountBankNum;
	
	private String accountBankName;
	
	private String accountBankCode;
	
	private String taxRegisteredNo;
	
	private String organizationCodeNo;
	
	private int billingCydeId;
	
	
	
	public int getBillingCydeId() {
		return billingCydeId;
	}

	public void setBillingCydeId(int billingCydeId) {
		this.billingCydeId = billingCydeId;
	}

	public Integer getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(Integer merchantId) {
		this.merchantId = merchantId;
	}

	public String getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getCardId() {
		return cardId;
	}

	public void setCardId(String cardId) {
		this.cardId = cardId;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getCityId() {
		return cityId;
	}

	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}

	public Integer getId() {
		return id;
	}
	
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getPayChannelId() {
		return payChannelId;
	}

	public void setPayChannelId(Integer payChannelId) {
		this.payChannelId = payChannelId;
	}

	public String getAccountBankNum() {
		return accountBankNum;
	}

	public void setAccountBankNum(String accountBankNum) {
		this.accountBankNum = accountBankNum;
	}

	public String getAccountBankName() {
		return accountBankName;
	}

	public void setAccountBankName(String accountBankName) {
		this.accountBankName = accountBankName;
	}

	public String getAccountBankCode() {
		return accountBankCode;
	}

	public void setAccountBankCode(String accountBankCode) {
		this.accountBankCode = accountBankCode;
	}

	public String getTaxRegisteredNo() {
		return taxRegisteredNo;
	}

	public void setTaxRegisteredNo(String taxRegisteredNo) {
		this.taxRegisteredNo = taxRegisteredNo;
	}

	public String getOrganizationCodeNo() {
		return organizationCodeNo;
	}

	public void setOrganizationCodeNo(String organizationCodeNo) {
		this.organizationCodeNo = organizationCodeNo;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column opening_applies.id
	 * @param id  the value for opening_applies.id
	 * @mbggenerated
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column opening_applies.apply_customer_id
	 * @return  the value of opening_applies.apply_customer_id
	 * @mbggenerated
	 */
	public Integer getApplyCustomerId() {
		return applyCustomerId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column opening_applies.apply_customer_id
	 * @param applyCustomerId  the value for opening_applies.apply_customer_id
	 * @mbggenerated
	 */
	public void setApplyCustomerId(Integer applyCustomerId) {
		this.applyCustomerId = applyCustomerId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column opening_applies.preliminary_verify_user_id
	 * @return  the value of opening_applies.preliminary_verify_user_id
	 * @mbggenerated
	 */
	public Integer getPreliminaryVerifyUserId() {
		return preliminaryVerifyUserId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column opening_applies.preliminary_verify_user_id
	 * @param preliminaryVerifyUserId  the value for opening_applies.preliminary_verify_user_id
	 * @mbggenerated
	 */
	public void setPreliminaryVerifyUserId(Integer preliminaryVerifyUserId) {
		this.preliminaryVerifyUserId = preliminaryVerifyUserId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column opening_applies.terminal_id
	 * @return  the value of opening_applies.terminal_id
	 * @mbggenerated
	 */
	public Integer getTerminalId() {
		return terminalId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column opening_applies.terminal_id
	 * @param terminalId  the value for opening_applies.terminal_id
	 * @mbggenerated
	 */
	public void setTerminalId(Integer terminalId) {
		this.terminalId = terminalId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column opening_applies.status
	 * @return  the value of opening_applies.status
	 * @mbggenerated
	 */
	public Integer getStatus() {
		return status;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column opening_applies.status
	 * @param status  the value for opening_applies.status
	 * @mbggenerated
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column opening_applies.created_at
	 * @return  the value of opening_applies.created_at
	 * @mbggenerated
	 */
	public Date getCreatedAt() {
		return createdAt;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column opening_applies.created_at
	 * @param createdAt  the value for opening_applies.created_at
	 * @mbggenerated
	 */
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column opening_applies.updated_at
	 * @return  the value of opening_applies.updated_at
	 * @mbggenerated
	 */
	public Date getUpdatedAt() {
		return updatedAt;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column opening_applies.updated_at
	 * @param updatedAt  the value for opening_applies.updated_at
	 * @mbggenerated
	 */
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column opening_applies.opening_apply_mark_id
	 * @return  the value of opening_applies.opening_apply_mark_id
	 * @mbggenerated
	 */
	public Integer getOpeningApplyMarkId() {
		return openingApplyMarkId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column opening_applies.opening_apply_mark_id
	 * @param openingApplyMarkId  the value for opening_applies.opening_apply_mark_id
	 * @mbggenerated
	 */
	public void setOpeningApplyMarkId(Integer openingApplyMarkId) {
		this.openingApplyMarkId = openingApplyMarkId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column opening_applies.types
	 * @return  the value of opening_applies.types
	 * @mbggenerated
	 */
	public Integer getTypes() {
		return types;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column opening_applies.types
	 * @param types  the value for opening_applies.types
	 * @mbggenerated
	 */
	public void setTypes(Integer types) {
		this.types = types;
	}
	/**
	 * 申请状态(1 待初次预审 2待初预审不通过 3二次预审中 4二次预审不通过 5待审核 6审核中7审核失败8审核成功9已取消)
	 */
	public static final int STATUS_1 = 1;
	
	/**
	 * 申请状态(1 待初次预审 2待初预审不通过 3二次预审中 4二次预审不通过 5待审核 6审核中7审核失败8审核成功9已取消)
	 */
	public static final int STATUS_2 = 2;
	
	/**
	 * 申请状态(1 待初次预审 2待初预审不通过 3二次预审中 4二次预审不通过 5待审核 6审核中7审核失败8审核成功9已取消)
	 */
	public static final int STATUS_3 = 3;
	
	/**
	 * 申请状态(1 待初次预审 2待初预审不通过 3二次预审中 4二次预审不通过 5待审核 6审核中7审核失败8审核成功9已取消)
	 */
	public static final int STATUS_4 = 4;
	
	/**
	 * 申请状态(1 待初次预审 2待初预审不通过 3二次预审中 4二次预审不通过 5待审核 6审核中7审核失败8审核成功9已取消)
	 */
	public static final int STATUS_5 = 5;
	
	/**
	 * 申请状态(1 待初次预审 2待初预审不通过 3二次预审中 4二次预审不通过 5待审核 6审核中7审核失败8审核成功9已取消)
	 */
	public static final int STATUS_6 = 6;
	
	/**
	 * 申请状态(1 待初次预审 2待初预审不通过 3二次预审中 4二次预审不通过 5待审核 6审核中7审核失败8审核成功9已取消)
	 */
	public static final int STATUS_7 = 7;
	
	/**
	 * 申请状态(1 待初次预审 2待初预审不通过 3二次预审中 4二次预审不通过 5待审核 6审核中7审核失败8审核成功9已取消)
	 */
	public static final int STATUS_8 = 8;
	
	/**
	 * 申请状态(1 待初次预审 2待初预审不通过 3二次预审中 4二次预审不通过 5待审核 6审核中7审核失败8审核成功9已取消)
	 */
	public static final int STATUS_9 = 9;

	
	/**
	 * 申请开通材料对公对私状态(对公)
	 */
	public static final int TYPES_1 = 1;
	
	/**
	 * 申请开通材料对公对私状态(对私)
	 */
	public static final int TYPES_2 = 2;
}