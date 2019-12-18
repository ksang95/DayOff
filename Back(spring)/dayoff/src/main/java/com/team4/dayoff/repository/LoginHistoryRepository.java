package com.team4.dayoff.repository;

import com.team4.dayoff.entity.LoginHistory;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * LoginHistoryRepository
 */
public interface LoginHistoryRepository extends JpaRepository<LoginHistory,Integer> {

    
}