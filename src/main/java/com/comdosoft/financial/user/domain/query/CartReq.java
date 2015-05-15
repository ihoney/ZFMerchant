package com.comdosoft.financial.user.domain.query;

import java.util.List;

public class CartReq {
    
    
     private int id;
     private int goodId;
     private int customerId;
     private int quantity;
     private int paychannelId;
     private int type;
     
     private List<Cart> cart;
     
     //{"id":1,"goodId":2,"customerId":2,"quantity":2,"paychannelId":2}
     
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getGoodId() {
        return goodId;
    }
    public void setGoodId(int goodId) {
        this.goodId = goodId;
    }
    public int getCustomerId() {
        return customerId;
    }
    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }
    public int getQuantity() {
        return quantity==0?1:quantity;
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
    public int getType() {
        return type;
    }
    public void setType(int type) {
        this.type = type;
    }
    public List<Cart> getCart() {
        return cart;
    }
    public void setCart(List<Cart> cart) {
        this.cart = cart;
    }
     
     

}
