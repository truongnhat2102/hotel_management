package com.example.hotel_ocean_royal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotel_ocean_royal.model.entities.Order;
import com.example.hotel_ocean_royal.model.service.OrderService;

@RestController
@RequestMapping("/order")
public class RestOrderController {
    @Autowired
    OrderService OrderService;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAll() {
        List<Order> Orders = OrderService.getAll();
        if (Orders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(Orders);
    }

    @GetMapping(value = {"/{id}", "/{id}/"})
    public ResponseEntity<?> getMethodName(@PathVariable(name = "id") long id) {
        Order Order = OrderService.getById(id);
        if (Order == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(Order);
    }
    

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Order Order) {
        if (Order == null) {
            return ResponseEntity.badRequest().build();
        }
        OrderService.save(Order);
        return ResponseEntity.ok(Order);
    }

    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") long id){
        Order Order = OrderService.getById(id);
        if (Order == null) {
            return ResponseEntity.noContent().build();
        }
        OrderService.remove(id);
        return ResponseEntity.ok(Order);
    }
    
}
