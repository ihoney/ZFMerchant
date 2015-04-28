package com.comdosoft.financial.user.domain.zhangfu;

import java.util.Date;

/**
 * 申请成为代理商，
 * 
 * @author Maple.liu
 *
 */
public class AgentsJoin {
	private Integer id;
	private String agent_type;
	private String address;
	private Integer status;
	private String touchName;
	private String touchPhone;
	private Date createDate;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAgent_type() {
		return agent_type;
	}

	public void setAgent_type(String agent_type) {
		this.agent_type = agent_type;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getTouchName() {
		return touchName;
	}

	public void setTouchName(String touchName) {
		this.touchName = touchName;
	}

	public String getTouchPhone() {
		return touchPhone;
	}

	public void setTouchPhone(String touchPhone) {
		this.touchPhone = touchPhone;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

}
