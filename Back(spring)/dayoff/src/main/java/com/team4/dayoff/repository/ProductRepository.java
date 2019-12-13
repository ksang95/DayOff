package com.team4.dayoff.repository;

import java.util.Date;

import com.team4.dayoff.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

/**
 * ProductRepository
 */
public interface ProductRepository extends JpaRepository<Product,Integer>{
    public int countByRegisterDateBetween(Date from, Date to);

    @Transactional
    @Modifying
	@Query("UPDATE Product p SET p.isAvailable=0 WHERE p.id= :productId")
    public void disableProduct(int productId);
    
}