package com.example.hotel_ocean_royal.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotel_ocean_royal.model.entities.Order;
import com.example.hotel_ocean_royal.model.repo.OrderRepo;

@Service
public class OrderService {
    @Autowired
    OrderRepo OrderRepo;

    public List<Order> getAll(){
        return OrderRepo.findAll();
    }

    public Order getById(long Order_id){
        return OrderRepo.getReferenceById(Order_id);
    }

    public void save(Order Order){
        OrderRepo.save(Order);
    }

    public void remove(long Order_id){
        OrderRepo.deleteById(Order_id);
    }
}
