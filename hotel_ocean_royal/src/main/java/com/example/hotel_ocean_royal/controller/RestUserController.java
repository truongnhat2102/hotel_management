package com.example.hotel_ocean_royal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotel_ocean_royal.dto.PasswordChangeDTO;
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

    @Autowired
    PasswordEncoder passwordEncoder;

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

    @PostMapping("/changePassword/{id}")
    public ResponseEntity<String> changePassword(@PathVariable("id") long userId, @RequestBody PasswordChangeDTO passwordChangeDTO) {
        // Log the received payload for debugging
        System.out.println("Received change password request for user ID: " + userId);
        System.out.println("Old Password: " + passwordChangeDTO.getOldPassword());
        System.out.println("New Password: " + passwordChangeDTO.getNewPassword());
        System.out.println("Confirm Password: " + passwordChangeDTO.getConfirmPassword());
    
        if (passwordChangeDTO.getOldPassword() == null || 
            passwordChangeDTO.getNewPassword() == null || 
            passwordChangeDTO.getConfirmPassword() == null) {
            return new ResponseEntity<>("Missing required fields", HttpStatus.BAD_REQUEST);
        }
    
        User existinguser = userService.getById(userId);
        if (existinguser == null) {
            return new ResponseEntity<>("user not found", HttpStatus.NOT_FOUND);
        }
    
        if (!passwordChangeDTO.getNewPassword().equals(passwordChangeDTO.getConfirmPassword())) {
            return new ResponseEntity<>("New password and confirm password do not match", HttpStatus.BAD_REQUEST);
        }
      
        if (!passwordEncoder.matches(passwordChangeDTO.getOldPassword(), existinguser.getPassword())) {
            return new ResponseEntity<>("Old password is incorrect", HttpStatus.UNAUTHORIZED);
        }
    
        existinguser.setPassword(passwordChangeDTO.getNewPassword());
        userService.save(existinguser);
    
        return new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
    }
    

}
