package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.Refunds;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * RefundsRepository
 */
public interface RefundsRepository extends JpaRepository<Refunds,Integer> {

    //Refunds findByOrders_id(Integer ordersId);

    @Query(value="SELECT sex, (TIMESTAMPDIFF(year, birth, CURDATE()) DIV 10)*10  ageGroup, COUNT(IF(DATE_FORMAT(signUpDate,'%Y-%m')=:yearMonth, u.id, null)) signUp, COUNT(IF(DATE_FORMAT(withdrawDate,'%Y-%m')=:yearMonth, u.id, null)) withdraw FROM users u LEFT JOIN withdrawHistory w ON w.userId=u.id GROUP BY sex, ageGroup ORDER BY ageGroup, sex", nativeQuery=true)
    List<Object[]> countReasonByYearMonth(@Param("yearMonth") String yearMonth);
}