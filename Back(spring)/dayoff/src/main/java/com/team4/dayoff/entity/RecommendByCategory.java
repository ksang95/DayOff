package com.team4.dayoff.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

/**
 * recommandByCategory
 */
@Entity
@Table(name="recommendByCategory")
@Getter
@Setter
public class RecommendByCategory {

    @Column
    private String productName;

    @Column
    private String categoryName;

    @Column
    private String categorysubName;

    @Column
    private int price;
    @Id
    private int productId;

    @Column
    private String productThumbnailName;

    @Override
    public String toString() {
        return "recommendByCategory [categoryName=" + categoryName + ", productId=" + productId + ", productName="
                + productName + ", productThumbnailName=" + productThumbnailName + "]";
    }
    
    
}