package com.team4.dayoff.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * orderView
 */
@Entity
@Setter
@Getter
@Table(name="orderGroup")
public class orderGroup {

    @Id
    private int tid;

    @Column
    private Integer invoice;

    @Override
    public String toString() {
        return "orderGroup [invoice=" + invoice + ", tid=" + tid + "]";
    }


    
}