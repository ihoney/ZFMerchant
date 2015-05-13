package com.comdosoft.financial.user.domain.query;

public class Cart {

    private int goodId;
    private int quantity;
    private int paychannelId;

    public int getGoodId() {
        return goodId;
    }

    public void setGoodId(int goodId) {
        this.goodId = goodId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPaychannelId() {
        return paychannelId;
    }

    public void setPaychannelId(int paychannelId) {
        this.paychannelId = paychannelId;
    }

}
