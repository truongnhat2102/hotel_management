package com.example.hotel_ocean_royal.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FeedBackDTO {
    private String feedbacks_content;
    private LocalDateTime feedbacks_editTime;
    private int amount_star;
    private String username;
    private int room_id;
   
}
