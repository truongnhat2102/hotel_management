package com.example.hotel_ocean_royal.model.repo;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotel_ocean_royal.model.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

     @Query(value = "select * from user where role_user like :role_user;", nativeQuery = true)
    ArrayList<User> findByRole_user(@Param("role_user") String role_user);
}
