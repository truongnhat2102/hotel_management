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

import com.example.hotel_ocean_royal.model.entities.BonusService;
import com.example.hotel_ocean_royal.model.service.ServiceService;

@RestController
@RequestMapping("/service")
public class RestBonusServiceController {
    @Autowired
    ServiceService ServiceService;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAll() {
        List<BonusService> BonusServices = ServiceService.getAll();
        if (BonusServices.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BonusServices);
    }

    @GetMapping(value = {"/{id}", "/{id}/"})
    public ResponseEntity<?> getMethodName(@PathVariable(name = "id") long id) {
        BonusService BonusService = ServiceService.getById(id);
        if (BonusService == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BonusService);
    }
    

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody BonusService BonusService) {
        if (BonusService == null) {
            return ResponseEntity.badRequest().build();
        }
        ServiceService.save(BonusService);
        return ResponseEntity.ok(BonusService);
    }

    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") long id){
        BonusService BonusService = ServiceService.getById(id);
        if (BonusService == null) {
            return ResponseEntity.noContent().build();
        }
        ServiceService.remove(id);
        return ResponseEntity.ok(BonusService);
    }
    
}
