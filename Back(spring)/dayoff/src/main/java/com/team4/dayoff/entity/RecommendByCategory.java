package com.team4.dayoff.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * recommandByCategory
 */
@Entity
@Getter
@Setter
public class RecommendByCategory {

    @Column
    private String productName;

    @Column
    private String categoryName;


    @Id
    private int productId;

    @Column
    private String url;

    @Override
    public String toString() {
        return "recommendByCategory [categoryName=" + categoryName + ", productId=" + productId + ", productName="
                + productName + ", url=" + url + "]";
    }
    
    
}