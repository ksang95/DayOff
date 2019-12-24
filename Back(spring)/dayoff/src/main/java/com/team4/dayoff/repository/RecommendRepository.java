package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.RecommendByCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

/**
 * testRepository
 */
@Service
public interface RecommendRepository extends JpaRepository<RecommendByCategory,Integer>{
 List<RecommendByCategory> findByCategoryName(@Param("categoryName") String categoryName);

 RecommendByCategory findByUrl(@Param("url")String url);

 RecommendByCategory findByProductId(@Param("id") int id);

}