package com.example.hotel_ocean_royal.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotel_ocean_royal.model.entities.BonusService;
import com.example.hotel_ocean_royal.model.repo.ServiceRepo;

@Service
public class ServiceService {
    @Autowired
    ServiceRepo serviceRepo;

    public List<BonusService> getAll(){
        return serviceRepo.findAll();
    }

    public BonusService getById(long Service_id){
        return serviceRepo.getReferenceById(Service_id);
    }

    public void save(BonusService Service){
        serviceRepo.save(Service);
    }

    public void remove(long Service_id){
        serviceRepo.deleteById(Service_id);
    }
}
