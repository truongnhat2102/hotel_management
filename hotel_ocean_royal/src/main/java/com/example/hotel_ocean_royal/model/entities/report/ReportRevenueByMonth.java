package com.example.hotel_ocean_royal.model.entities.report;

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
public class ReportRevenueByMonth {
    private long totalRevenueByMonth;
    private int month;
    private int year;
}
