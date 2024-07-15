package com.example.hotel_ocean_royal.controller;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.example.hotel_ocean_royal.dto.OrderRequest;
import com.example.hotel_ocean_royal.model.entities.Order;
import com.example.hotel_ocean_royal.model.entities.Room;
import com.example.hotel_ocean_royal.model.entities.User;
import com.example.hotel_ocean_royal.model.service.OrderService;
import com.example.hotel_ocean_royal.model.service.RoomService;
import com.example.hotel_ocean_royal.model.service.UserService;
import com.example.hotel_ocean_royal.vnpay.VNPayService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/vnpay")
public class RestVNPaymentController {

    @Autowired
    private VNPayService vnPayService;

    @Autowired
    OrderService OrderService;

    @Autowired
    UserService userService;

    @Autowired
    RoomService roomService;

    @PostMapping("/submitOrder")
    public ResponseEntity<Map<String, String>> submitOrder(@RequestBody OrderRequest orderRequest,
            HttpServletRequest request) {
        String baseUrl = request.getScheme() + "://" + request.getServerName() +
                (request.getServerPort() != 80 && request.getServerPort() != 443 ? ":" + request.getServerPort() : "");
        String vnpayUrl = vnPayService.createOrder(orderRequest.getAmount(), orderRequest.getOrderInfo(), baseUrl);

        Map<String, String> response = new HashMap<>();
        response.put("redirectUrl", vnpayUrl);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/vnpay-payment")
    public RedirectView GetMapping(HttpServletRequest request, Model model) {
        int paymentStatus = vnPayService.orderReturn(request);
        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");
        String status = "OrderFail";
        System.out.println(orderInfo);
        if (paymentStatus == 1) {
            status = "Paid";
            String[] arr = orderInfo.split(";");
            User user = userService.findByUsername(arr[0]).orElse(new User());
            Room room = roomService.getById(Long.parseLong(arr[1]));
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy, hh:mm a");
            LocalDateTime order_checkindate = LocalDateTime.parse(arr[2], formatter);
            LocalDateTime order_checkoutdate = LocalDateTime.parse(arr[3], formatter);
            Order order = new Order(0, LocalDateTime.now(), order_checkindate, order_checkoutdate, totalPrice, status, null, user, room);
            OrderService.save(order);
        }
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://localhost:3000/booking-confirmation?payment="+status+"&hotel=");
        return redirectView;
    }
}
