package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.OrderDetailView;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;


@Service
public interface OrderDetailViewRepository extends JpaRepository<OrderDetailView, Integer> {
    public List<OrderDetailView> findByGroupId(int groupId);
}
