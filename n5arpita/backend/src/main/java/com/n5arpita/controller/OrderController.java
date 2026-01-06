package com.n5arpita.controller;

import com.n5arpita.config.CustomUserDetailsService;
import com.n5arpita.dto.CheckoutRequest;
import com.n5arpita.model.Order;
import com.n5arpita.model.User;
import com.n5arpita.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody CheckoutRequest request, Authentication authentication) {
        User user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(orderService.createOrder(user, request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {
        User user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(orderService.getUserOrders(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id, Authentication authentication) {
        User user = userDetailsService.getUserByEmail(authentication.getName());
        Order order = orderService.getOrderById(id);

        if (!order.getUser().getId().equals(user.getId()) && !user.getRole().equals(User.Role.ADMIN)) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(order);
    }
}
