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

import com.example.hotel_ocean_royal.model.entities.Room;
import com.example.hotel_ocean_royal.model.service.RoomService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/room")
public class RestRoomController {
    @Autowired
    RoomService RoomService;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        List<Room> Rooms = RoomService.getAll();
        if (Rooms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(Rooms);
    }

    @GetMapping(value = {"/{id}", "/{id}/"})
    public ResponseEntity<?> getMethodName(@PathVariable(name = "id") long id) {
        Room Room = RoomService.getById(id);
        if (Room == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(Room);
    }
    

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Room Room) {
        if (Room == null) {
            return ResponseEntity.badRequest().build();
        }
        RoomService.save(Room);
        return ResponseEntity.ok(Room);
    }

    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") long id){
        Room Room = RoomService.getById(id);
        if (Room == null) {
            return ResponseEntity.noContent().build();
        }
        RoomService.remove(id);
        return ResponseEntity.ok(Room);
    }

    @GetMapping("/verticalFilters")
    public ResponseEntity<?> getByVerticalFilters() {
        List<Room> Rooms = RoomService.getAll();
        if (Rooms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(Rooms);
    }
    
    
}
