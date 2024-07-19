package com.example.hotel_ocean_royal.model.service;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotel_ocean_royal.dto.FeedBackDTO;
import com.example.hotel_ocean_royal.model.entities.FeedBack;
import com.example.hotel_ocean_royal.model.entities.Room;
import com.example.hotel_ocean_royal.model.entities.User;
import com.example.hotel_ocean_royal.model.repo.FeedBackRepo;
import com.example.hotel_ocean_royal.model.repo.RoomRepo;
import com.example.hotel_ocean_royal.model.repo.UserRepo;

@Service
public class FeedBackService {
    @Autowired
    FeedBackRepo FeedBackRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    RoomRepo roomRepo;

    public List<FeedBack> getAll(){
        return FeedBackRepo.findAll();
    }

    public FeedBack getById(long FeedBack_id){
        return FeedBackRepo.getReferenceById(FeedBack_id);
    }

    public FeedBack save(FeedBackDTO FeedBack){
        User user = userRepo.findByUsername(FeedBack.getUsername()).orElse(null);
        Room room = roomRepo.getReferenceById(FeedBack.getRoom_id());
        LocalDateTime time_edit = LocalDateTime.now();
        FeedBack newFeedBack = new FeedBack(0, FeedBack.getFeedbacks_content(), FeedBack.getAmount_star(), time_edit, user, room);
        return FeedBackRepo.save(newFeedBack);
    }

    public void remove(long FeedBack_id){
        FeedBackRepo.deleteById(FeedBack_id);
    }

    public ArrayList<FeedBack> getFeedBacksByRoom(long room_id){
        return FeedBackRepo.getFeedBacksByRoom(room_id);
    }
}
