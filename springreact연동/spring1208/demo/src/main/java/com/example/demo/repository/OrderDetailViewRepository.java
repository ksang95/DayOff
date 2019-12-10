package com.example.demo.repository;

import java.util.List;

import com.example.demo.entity.OrderDetailView;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailViewRepository extends JpaRepository<OrderDetailView, Integer> {
    public List<OrderDetailView> findByGroupId(int groupId);
}
