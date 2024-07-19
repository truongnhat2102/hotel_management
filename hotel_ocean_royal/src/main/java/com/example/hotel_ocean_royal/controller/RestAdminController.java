package com.example.hotel_ocean_royal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotel_ocean_royal.model.service.AdminService;
import com.example.hotel_ocean_royal.model.service.UserService;

@RestController
@RequestMapping("/admin")
public class RestAdminController {
    @Autowired
    AdminService adminService = new AdminService();

    @Autowired
    UserService userService = new UserService();

    @GetMapping("/top10rooms")
    public ResponseEntity<?> getTop10Rooms(){
        return ResponseEntity.ok(adminService.getTop10Rooms());
    }

    @GetMapping("/user/{role_user}")
    public ResponseEntity<?> getUserBYRoleUser(@PathVariable("role_user") String role_user){
        return ResponseEntity.ok(userService.findByRoleUser(role_user));
    }

    @GetMapping("/chart")
    public ResponseEntity<?> getRevenueByMonth(){
        return ResponseEntity.ok(adminService.getRevenueByMonth());
    }

}
