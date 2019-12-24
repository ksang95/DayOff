package com.team4.dayoff.repository;

import com.team4.dayoff.entity.OrderView;
import com.team4.dayoff.entity.Orders;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
/**
 * OrdersRepository
 */
public interface OrdersRepository extends JpaRepository<Orders,Integer>{
   
    
}