package com.example.hotel_ocean_royal.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotel_ocean_royal.model.entities.Room;
import com.example.hotel_ocean_royal.model.repo.RoomRepo;

@Service
public class RoomService {
    @Autowired
    RoomRepo RoomRepo;

    public List<Room> getAll(){
        return RoomRepo.findAll();
    }

    public Room getById(long Room_id){
        return RoomRepo.getReferenceById(Room_id);
    }

    public void save(Room Room){
        RoomRepo.save(Room);
    }

    public void remove(long Room_id){
        RoomRepo.deleteById(Room_id);
    }

    public List<Room> getRoomsTopService() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getRoomsTopService'");
    }

    public List<Room> getAvailableRoom() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAvailableRoom'");
    }
}
