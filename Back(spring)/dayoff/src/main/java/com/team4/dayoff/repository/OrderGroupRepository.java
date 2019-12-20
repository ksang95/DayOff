package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.OrderGroup;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

@Service
public interface OrderGroupRepository extends JpaRepository<OrderGroup, Long>{
    //쿼리 넣어야!!!

    @Query(value="SELECT sex, (TIMESTAMPDIFF(year, birth, CURDATE()) DIV 10)*10  ageGroup, COUNT(IF(DATE_FORMAT(signUpDate,'%Y-%m')=:yearMonth, u.id, null)) signUp, COUNT(IF(DATE_FORMAT(withdrawDate,'%Y-%m')=:yearMonth, u.id, null)) withdraw FROM users u LEFT JOIN withdrawHistory w ON w.userId=u.id GROUP BY sex, ageGroup ORDER BY ageGroup, sex",nativeQuery=true)
    List<String[]> countOrderSexAndAgeGroupByYearMonth(@Param("yearMonth") String yearMonth);

    @Query(value="SELECT * FROM ( "+
        "(SELECT u.month, IFNULL(signUp,0) signUp, IFNULL(withdraw,0) withdraw FROM "+
        "(SELECT DATE_FORMAT(signUpDate,'%m') month, COUNT(*) signUp FROM users WHERE DATE_FORMAT(signUpDate,'%Y')=:year GROUP BY month) u "+
        "LEFT JOIN "+ 
        "(SELECT DATE_FORMAT(withdrawDate,'%m') month, COUNT(*) withdraw FROM withdrawHistory WHERE DATE_FORMAT(withdrawDate,'%Y')=:year GROUP BY month) w "+
        "ON w.month=u.month "+
        ") "+
        "UNION "+
        "(SELECT w.month, IFNULL(signUp,0) signUp, IFNULL(withdraw,0) withdraw FROM "+
        "(SELECT DATE_FORMAT(signUpDate,'%m') month, COUNT(*) signUp FROM users WHERE DATE_FORMAT(signUpDate,'%Y')=:year GROUP BY month) u "+
        "RIGHT JOIN "+
        "(SELECT DATE_FORMAT(withdrawDate,'%m') month, COUNT(*) withdraw FROM withdrawHistory WHERE DATE_FORMAT(withdrawDate,'%Y')=:year GROUP BY month) w "+
        "ON w.month=u.month "+
        ") "+
        ") un ORDER BY month",nativeQuery = true)
    List<String[]> countOrderrMonthByYear(@Param("year") String year);

    @Query(value="SELECT * FROM ( "+
        "(SELECT u.year, IFNULL(signUp,0) signUp, IFNULL(withdraw,0) withdraw FROM (SELECT DATE_FORMAT(signUpDate,'%Y') year, COUNT(*) signUp FROM users GROUP BY year) u LEFT JOIN (SELECT DATE_FORMAT(withdrawDate,'%Y') year, COUNT(*) withdraw FROM withdrawHistory GROUP BY year) w ON w.year=u.year "+
        ") "+
        "UNION "+
        "(SELECT u.year, IFNULL(signUp,0) signUp, IFNULL(withdraw,0) withdraw FROM (SELECT DATE_FORMAT(signUpDate,'%Y') year, COUNT(*) signUp FROM users GROUP BY year) u RIGHT JOIN (SELECT DATE_FORMAT(withdrawDate,'%Y') year, COUNT(*) withdraw FROM withdrawHistory GROUP BY year) w ON w.year=u.year "+
        ") "+
        ") un ORDER BY year",nativeQuery=true)
    List<String[]> countOrderByYear();

    @Query(value="SELECT yearMonth FROM ( "+
        "SELECT DISTINCT DATE_FORMAT(signUpDate,'%Y-%m') yearMonth FROM users "+
        "UNION "+
        "SELECT DISTINCT DATE_FORMAT(withdrawDate,'%Y-%m') yearMonth FROM withdrawHistory ) u ORDER BY yearMonth DESC",nativeQuery = true)
    List<String> findYearMonthOfOrders();

    @Query(value="SELECT year FROM ( "+
        "SELECT DISTINCT DATE_FORMAT(signUpDate,'%Y') year FROM users "+
        "UNION "+
        "SELECT DISTINCT DATE_FORMAT(withdrawDate,'%Y') year FROM withdrawHistory ) u ORDER BY year DESC",nativeQuery = true)
    List<String> findYearOfOrders();
    
}