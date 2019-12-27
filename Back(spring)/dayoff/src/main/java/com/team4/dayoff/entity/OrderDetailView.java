package com.team4.dayoff.entity;

import java.util.Date;

import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.data.annotation.Id;
import org.springframework.data.jpa.repository.Temporal;

public class OrderDetailView {
    @Id
    Integer orderId;

    Integer productId;
    String productThumbnailName;
    String productName;
    Integer productPrice;
    Integer productIsAvailable;
    String orderColor;
    String orderSize;
    Integer orderQuantity;
    Integer orderPrice;
    String code;
    String codeContent;
    Integer groupId;
    Integer userId;
    String userName;
    Integer totalPay;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Date orderDate;

    private Integer couponDiscount;
    private Integer gradeDiscount;
    private Integer pointUse;
    private Integer invoice;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Date refundRequestDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Date refundDate;

    private Integer refundAmount;
    private Integer storesId;
    private String storesName;
    private String storesLocation;
    private Integer deliverId;
    private String deliverName;
    private String deliverLocation;
    private String deliverPostalCode;
    private String deliverPhone;

}