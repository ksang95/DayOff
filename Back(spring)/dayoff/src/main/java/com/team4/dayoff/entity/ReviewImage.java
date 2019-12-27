package com.team4.dayoff.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="reviewImage")
@DynamicInsert
public class ReviewImage{

    @Id
    private Integer id;
    private String name;
    private String originalName;
    private Integer review;


    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="reviewId")
    private Review riview;

}