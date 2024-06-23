package com.example.hotel_ocean_royal.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hotel_ocean_royal.model.entities.Room;

@Repository
public interface RoomRepo extends JpaRepository<Room, Long> {
    
}
