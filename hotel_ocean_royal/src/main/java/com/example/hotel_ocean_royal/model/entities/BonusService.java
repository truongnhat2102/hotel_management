package com.example.hotel_ocean_royal.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "service")
public class BonusService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long service_id;

    private String service_name;
    private String service_price;
    private String service_description;
}
