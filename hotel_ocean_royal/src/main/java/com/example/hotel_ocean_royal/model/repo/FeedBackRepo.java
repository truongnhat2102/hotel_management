package com.example.hotel_ocean_royal.model.repo;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotel_ocean_royal.model.entities.FeedBack;

@Repository
public interface FeedBackRepo extends JpaRepository<FeedBack, Long> {
    
    @Query(value = "select \n" + //
                "    *\n" + //
                "from feedback\n" + //
                "join room on feedback.room = room.room_id\n" + //
                "where room.room_id = :room_id", nativeQuery = true)
    public ArrayList<FeedBack> getFeedBacksByRoom(@Param("room_id") long room_id);
}