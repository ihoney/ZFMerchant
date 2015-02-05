package com.comdosoft.financial.user.domain.query;

public class PosReq {
    
    /**
     * 0.按照上架时间倒序排列商品
     * 1.按照销售优先倒序排列商品
     * 2.按照价格倒序排列商品
     * 3.按照价格正序排列商品
     * 4.按照评分最高倒序排列商品
     */
    private int goodId;
    
    private int orderType;
  
    private int page;
    
    private int [] Brands_id;//POS品牌
    private int [] Model_number;//POS机类型
    private int [] pay_channels;//支付通道
    private int [] s;
    private int [] f;
    private int [] g;
    private int [] h;
    
    private double minPrice;
    private double maxPrice;
    public int getOrderType() {
        return orderType;
    }
    public void setOrderType(int orderType) {
        this.orderType = orderType;
    }
    public int getPage() {
        return page;
    }
    public void setPage(int page) {
        this.page = page;
    }
    public int[] getBrands_id() {
        return Brands_id;
    }
    public void setBrands_id(int[] brands_id) {
        Brands_id = brands_id;
    }
    public int[] getModel_number() {
        return Model_number;
    }
    public void setModel_number(int[] model_number) {
        Model_number = model_number;
    }
    public int[] getPay_channels() {
        return pay_channels;
    }
    public void setPay_channels(int[] pay_channels) {
        this.pay_channels = pay_channels;
    }
    public int[] getS() {
        return s;
    }
    public void setS(int[] s) {
        this.s = s;
    }
    public int[] getF() {
        return f;
    }
    public void setF(int[] f) {
        this.f = f;
    }
    public int[] getG() {
        return g;
    }
    public void setG(int[] g) {
        this.g = g;
    }
    public int[] getH() {
        return h;
    }
    public void setH(int[] h) {
        this.h = h;
    }
    public double getMinPrice() {
        return minPrice;
    }
    public void setMinPrice(double minPrice) {
        this.minPrice = minPrice;
    }
    public double getMaxPrice() {
        return maxPrice;
    }
    public void setMaxPrice(double maxPrice) {
        this.maxPrice = maxPrice;
    }
    public int getGoodId() {
        return goodId;
    }
    public void setGoodId(int goodId) {
        this.goodId = goodId;
    }

    
    
}
