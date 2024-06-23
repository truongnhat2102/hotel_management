package com.example.hotel_ocean_royal.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hotel_ocean_royal.model.entities.FeedBack;

@Repository
public interface FeedBackRepo extends JpaRepository<FeedBack, Long> {
    
}