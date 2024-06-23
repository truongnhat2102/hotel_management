package com.example.hotel_ocean_royal.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotel_ocean_royal.model.entities.FeedBack;
import com.example.hotel_ocean_royal.model.repo.FeedBackRepo;

@Service
public class FeedBackService {
    @Autowired
    FeedBackRepo FeedBackRepo;

    public List<FeedBack> getAll(){
        return FeedBackRepo.findAll();
    }

    public FeedBack getById(long FeedBack_id){
        return FeedBackRepo.getReferenceById(FeedBack_id);
    }

    public void save(FeedBack FeedBack){
        FeedBackRepo.save(FeedBack);
    }

    public void remove(long FeedBack_id){
        FeedBackRepo.deleteById(FeedBack_id);
    }
}
