package com.team4.dayoff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<com.team4.dayoff.entity.Users, Long> {
}
