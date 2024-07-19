package com.example.hotel_ocean_royal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    private long user_id;
    private String user_fullname;
    private String username;
    private String password;
    private int user_age;
    private String user_gender;
    private String user_phoneNumber;
    private String user_email;
    private String user_idCard;
    private String user_ava;
}
