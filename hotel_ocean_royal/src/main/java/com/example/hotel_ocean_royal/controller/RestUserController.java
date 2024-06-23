package com.example.hotel_ocean_royal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotel_ocean_royal.model.entities.User;
import com.example.hotel_ocean_royal.model.service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequestMapping(value = "/user")
public class RestUserController {
    @Autowired
    UserService userService;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAll() {
        List<User> users = userService.getAll();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping(value = {"/{id}", "/{id}/"})
    public ResponseEntity<?> getMethodName(@PathVariable(name = "id") long id) {
        User user = userService.getById(id);
        if (user == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(user);
    }
    

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody User user) {
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }
        userService.save(user);
        return ResponseEntity.ok(user);
    }

    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") long id){
        User user = userService.getById(id);
        if (user == null) {
            return ResponseEntity.noContent().build();
        }
        userService.remove(id);
        return ResponseEntity.ok(user);
    }
    

}
