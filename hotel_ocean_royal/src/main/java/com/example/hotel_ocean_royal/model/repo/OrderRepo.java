package com.example.hotel_ocean_royal.model.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotel_ocean_royal.model.entities.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {

    @Query(value = "select * from orders join user on orders.user = user.user_id where user_id = :user_id;", nativeQuery = true)
    List<Order> getOrdersByUserId(@Param("user_id") long user_id);
    
}
