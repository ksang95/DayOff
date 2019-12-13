package com.team4.dayoff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.team4.dayoff.entity.orderGroup;;

@Service
public interface orderGroupRepository extends JpaRepository<orderGroup, Long>{

}