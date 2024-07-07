package com.example.hotel_ocean_royal.model.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long room_id;

    private String room_name;
    private String room_status;
    private String room_price;
    private String room_type;
    private String room_amountPeople;
    private String room_description;

    // @OneToMany(mappedBy = "room", fetch = FetchType.EAGER)
    // @JsonBackReference
    // private Set<Order> orders;

    // @OneToMany(mappedBy = "room", fetch = FetchType.EAGER)
    // @JsonBackReference
    // private Set<FeedBack> feedBacks;

}
