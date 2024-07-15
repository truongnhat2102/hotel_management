package com.example.hotel_ocean_royal.controller;

import java.util.ArrayList;
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

import com.example.hotel_ocean_royal.model.entities.FeedBack;
import com.example.hotel_ocean_royal.model.service.FeedBackService;

@RestController
@RequestMapping("/feedback")
public class RestFeedBackController {
    @Autowired
    FeedBackService FeedBackService;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAll() {
        List<FeedBack> FeedBacks = FeedBackService.getAll();
        if (FeedBacks.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(FeedBacks);
    }

    @GetMapping(value = {"/{id}", "/{id}/"})
    public ResponseEntity<?> getMethodName(@PathVariable(name = "id") long id) {
        FeedBack FeedBack = FeedBackService.getById(id);
        if (FeedBack == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(FeedBack);
    }
    

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody FeedBack FeedBack) {
        if (FeedBack == null) {
            return ResponseEntity.badRequest().build();
        }
        FeedBackService.save(FeedBack);
        return ResponseEntity.ok(FeedBack);
    }

    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") long id){
        FeedBack FeedBack = FeedBackService.getById(id);
        if (FeedBack == null) {
            return ResponseEntity.noContent().build();
        }
        FeedBackService.remove(id);
        return ResponseEntity.ok(FeedBack);
    }

    @GetMapping("/room/{room_id}/reviews")
    public ResponseEntity<?> getReviewsByRoom_id(@PathVariable(name = "room_id") long room_id){
        ArrayList<FeedBack> FeedBacks = FeedBackService.getFeedBacksByRoom(room_id);
        if (FeedBacks.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(FeedBacks);
    }
    
}
