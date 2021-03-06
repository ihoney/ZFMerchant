package com.comdosoft.financial.user.domain.zhangfu;

import java.util.Date;

public class GoodsPayChannel {

	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column goods_pay_channels.id
	 * @mbggenerated
	 */
	private Integer id;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column goods_pay_channels.good_id
	 * @mbggenerated
	 */
	private Integer goodId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column goods_pay_channels.pay_channel_id
	 * @mbggenerated
	 */
	private Integer payChannelId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column goods_pay_channels.status
	 * @mbggenerated
	 */
	private Byte status;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column goods_pay_channels.create_at
	 * @mbggenerated
	 */
	private Date createAt;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column goods_pay_channels.udpate_at
	 * @mbggenerated
	 */
	private Date udpateAt;

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column goods_pay_channels.id
	 * @return  the value of goods_pay_channels.id
	 * @mbggenerated
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column goods_pay_channels.id
	 * @param id  the value for goods_pay_channels.id
	 * @mbggenerated
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column goods_pay_channels.good_id
	 * @return  the value of goods_pay_channels.good_id
	 * @mbggenerated
	 */
	public Integer getGoodId() {
		return goodId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column goods_pay_channels.good_id
	 * @param goodId  the value for goods_pay_channels.good_id
	 * @mbggenerated
	 */
	public void setGoodId(Integer goodId) {
		this.goodId = goodId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column goods_pay_channels.pay_channel_id
	 * @return  the value of goods_pay_channels.pay_channel_id
	 * @mbggenerated
	 */
	public Integer getPayChannelId() {
		return payChannelId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column goods_pay_channels.pay_channel_id
	 * @param payChannelId  the value for goods_pay_channels.pay_channel_id
	 * @mbggenerated
	 */
	public void setPayChannelId(Integer payChannelId) {
		this.payChannelId = payChannelId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column goods_pay_channels.status
	 * @return  the value of goods_pay_channels.status
	 * @mbggenerated
	 */
	public Byte getStatus() {
		return status;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column goods_pay_channels.status
	 * @param status  the value for goods_pay_channels.status
	 * @mbggenerated
	 */
	public void setStatus(Byte status) {
		this.status = status;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column goods_pay_channels.create_at
	 * @return  the value of goods_pay_channels.create_at
	 * @mbggenerated
	 */
	public Date getCreateAt() {
		return createAt;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column goods_pay_channels.create_at
	 * @param createAt  the value for goods_pay_channels.create_at
	 * @mbggenerated
	 */
	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column goods_pay_channels.udpate_at
	 * @return  the value of goods_pay_channels.udpate_at
	 * @mbggenerated
	 */
	public Date getUdpateAt() {
		return udpateAt;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column goods_pay_channels.udpate_at
	 * @param udpateAt  the value for goods_pay_channels.udpate_at
	 * @mbggenerated
	 */
	public void setUdpateAt(Date udpateAt) {
		this.udpateAt = udpateAt;
	}
}