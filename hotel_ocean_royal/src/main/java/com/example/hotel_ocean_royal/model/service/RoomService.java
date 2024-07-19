package com.example.hotel_ocean_royal.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotel_ocean_royal.dto.RoomDTO;
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

    public Room save(RoomDTO RoomDTO){
        Room newRooom = new Room(RoomDTO.getRoom_id(), RoomDTO.getRoom_name(), "Empty", RoomDTO.getRoom_price(), RoomDTO.getRoom_type(), RoomDTO.getRoom_amountPeople(), RoomDTO.getRoom_description(), RoomDTO.getRoom_img1(), RoomDTO.getRoom_img2(), RoomDTO.getRoom_img3(), RoomDTO.getRoom_img4(), RoomDTO.getRoom_img5(), RoomDTO.getRoom_img6(), null, null);
        return RoomRepo.save(newRooom);
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

    public void save(Room room) {
       RoomRepo.save(room);
    }
}
