package com.example.demo.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@Entity
@Table(name="orderDetailView")
public class OrderDetailView {
    @Id
    int orderId;

    int productId;
    String productThumbnailUri;
    String productName;
    int productPrice;
    int productIsAvailable;
    String orderColor;
    String orderSize;
    int orderQuantity;
    int orderPrice;
    String code;
    String codeContent;
    int groupId;
    int userId;
    int totalPay;
    Date orderDate;
    int gradeDiscount;
    int pointUse;
    Integer invoice;
    Date refundRequestDate;
    Date refundDate;
    Integer refundAmount;
    Integer storesId;
    String storesName;
    String storesLocation;
    Integer deliverId;
    String deliverName;
    String deliverLocation;
    Integer deliverPostalCode;
    Integer deliverPhone;

}