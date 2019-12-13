package com.team4.dayoff.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.ColumnDefault;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="product")
public class Product{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private int price;
    private String detailImage;

    @Column(updatable = false,insertable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date registerDate;

    @Column(insertable = false)
    @ColumnDefault("1")
    private int isAvailable;

    @ManyToOne
    @JoinColumn(name="categoryId")
    private Category category;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    private List<ProductImage> productImage;

    @OneToMany(fetch = FetchType.LAZY, mappedBy="product")
    private List<ProductSize> productSize;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="productColor", joinColumns = @JoinColumn(name="productId"),inverseJoinColumns = @JoinColumn(name="colorId"))
    private List<Color> color;
}