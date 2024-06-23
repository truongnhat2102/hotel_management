package com.example.hotel_ocean_royal.model.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
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
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;

    private String username;
    private String password;
    private int user_age;
    private String user_gender;
    private String user_phoneNumber;
    private String user_email;
    private String user_idCard;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    private Set<Order> orders;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    private Set<FeedBack> feedBacks;

}
