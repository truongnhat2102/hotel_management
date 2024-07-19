package com.example.hotel_ocean_royal.model.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.hotel_ocean_royal.model.entities.Room;
import com.example.hotel_ocean_royal.model.entities.Top10Room;
import com.example.hotel_ocean_royal.model.entities.report.ReportRevenueByMonth;
import com.example.hotel_ocean_royal.model.repo.RoomRepo;

@Service
public class AdminService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private RoomRepo roomRepo;

    public ArrayList<Top10Room> getTop10Rooms() {
        String sql = "SELECT r.room_id, r.room_name, COUNT(o.order_id) AS total_orders\n" + //
                "FROM room r\n" + //
                "JOIN orders o ON r.room_id = o.room_id\n" + //
                "GROUP BY r.room_id, r.room_name\n" + //
                "ORDER BY total_orders DESC\n" + //
                "LIMIT 10;";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        ArrayList<Top10Room> top10RoomsList = new ArrayList<>();
        for (Map<String, Object> map : rows) {
            long room_id = (long) map.get("room_id");
            Room room = roomRepo.getReferenceById(room_id);
            long total_orders = (long) map.get("total_orders");
            Top10Room top10Room = new Top10Room(room, total_orders);
            top10RoomsList.add(top10Room);
        }
        return top10RoomsList;
    }

    public ArrayList<ReportRevenueByMonth> getRevenueByMonth() {
        String sql = "SELECT \n" + //
                "  YEAR(order_date_create) AS year,\n" + //
                "  MONTH(order_date_create) AS month,\n" + //
                "  SUM(order_total_price) AS total_room_revenue,\n" + //
                "  COALESCE(SUM(service_price), 0) AS total_service_revenue,\n" + //
                "  (SUM(order_total_price) + COALESCE(SUM(service_price), 0)) AS total_revenue\n" + //
                "FROM \n" + //
                "  orders\n" + //
                "LEFT JOIN \n" + //
                "  order_service ON orders.order_id = order_service.order_id\n" + //
                "LEFT JOIN \n" + //
                "  service ON order_service.service_id = service.service_id\n" + //
                "WHERE \n" + //
                "  order_date_create >= CURDATE() - INTERVAL 12 MONTH\n" + //
                "GROUP BY \n" + //
                "  YEAR(order_date_create), MONTH(order_date_create)\n" + //
                "ORDER BY\n" + //
                "  year, month;";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        ArrayList<ReportRevenueByMonth> reportRevenueByMonths = new ArrayList<>();
        for (Map<String, Object> map : rows) {
            long totalRevenueByMonth = (long) map.get("total_room_revenue");
            int month = (int) map.get("month");
            int year = (int) map.get("year");
            ReportRevenueByMonth reportRevenueByMonth = new ReportRevenueByMonth(totalRevenueByMonth, month, year);
            reportRevenueByMonths.add(reportRevenueByMonth);
        }
        return reportRevenueByMonths;
    }

}
