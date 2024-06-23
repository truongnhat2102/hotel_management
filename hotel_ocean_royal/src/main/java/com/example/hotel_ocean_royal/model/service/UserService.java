package com.example.hotel_ocean_royal.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotel_ocean_royal.model.entities.User;
import com.example.hotel_ocean_royal.model.repo.UserRepo;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    public List<User> getAll(){
        return userRepo.findAll();
    }

    public User getById(long user_id){
        return userRepo.getReferenceById(user_id);
    }

    public void save(User user){
        userRepo.save(user);
    }

    public void remove(long user_id){
        userRepo.deleteById(user_id);
    }

}
