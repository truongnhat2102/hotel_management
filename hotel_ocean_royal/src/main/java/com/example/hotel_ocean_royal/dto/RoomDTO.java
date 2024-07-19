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
public class RoomDTO {
    private long room_id;
    private String room_name;
    private String room_price;
    private String room_type;
    private String room_amountPeople;
    private String room_description;
    private String room_img1;
    private String room_img2;
    private String room_img3;
    private String room_img4;
    private String room_img5;
    private String room_img6;
}
