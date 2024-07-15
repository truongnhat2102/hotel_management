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

    @GetMapping("/topServices")
    public ResponseEntity<?> getRoomsTopService(){
        List<Room> Rooms = RoomService.getRoomsTopService();
        if (Rooms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(Rooms);
    }

    @GetMapping("/availableRoom")
    public ResponseEntity<?> getAvailableRoom(){
        List<Room> Rooms = RoomService.getAvailableRoom();
        if (Rooms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(Rooms);
    }

    @GetMapping("/checkIn/{room_id}")
    public ResponseEntity<?> changeStatusCheckIn(@PathVariable("room_id") long room_id){
        Room room = RoomService.getById(room_id);
        room.setRoom_status("Not Empty");
        RoomService.save(room);
        List<Room> Rooms = RoomService.getRoomsTopService();
        if (Rooms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(Rooms);
    }

    @GetMapping("/checkOut/{room_id}")
    public ResponseEntity<?> changeStatusCheckOut(@PathVariable("room_id") long room_id){
        Room room = RoomService.getById(room_id);
        room.setRoom_status("Empty");
        RoomService.save(room);
        List<Room> Rooms = RoomService.getRoomsTopService();
        if (Rooms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(Rooms);
    }
    
    
}
