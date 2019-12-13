package com.team4.dayoff.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

/**
 * orderView
 */
@Entity
@Setter
@Getter
@Table(name="orderGroup")
public class orderGroup {

    @Id
    private Integer tid;

    @Column
    private Integer invoice;

    @Override
    public String toString() {
        return "orderGroup [invoice=" + invoice + ", tid=" + tid + "]";
    }


    
}