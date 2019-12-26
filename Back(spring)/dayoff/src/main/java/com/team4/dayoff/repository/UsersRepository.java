package com.team4.dayoff.repository;

import com.team4.dayoff.entity.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {

    @Query(value="select * from users where socialId like %:socialId% and role = 'user'" , nativeQuery = true)
    Users findBySocialId2(@Param("socialId") String socialId);

    Users findBySocialIdAndRoleNot(String socialId, String role);

    Users findBySocialIdAndRole(String socialId, String role);
    
    @Transactional
    @Modifying
	@Query("UPDATE Users SET role='withdraw' WHERE id= :userId")
    void withdrawUser(int userId);
}
