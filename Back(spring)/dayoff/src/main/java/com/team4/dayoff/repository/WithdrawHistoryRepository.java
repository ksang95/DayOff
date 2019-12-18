package com.team4.dayoff.repository;

import com.team4.dayoff.entity.WithdrawHistory;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * WithdrawHistoryRepository
 */
public interface WithdrawHistoryRepository extends JpaRepository<WithdrawHistory,Integer> {
    
    
}