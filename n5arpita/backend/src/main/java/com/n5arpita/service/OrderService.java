package com.n5arpita.service;

import com.n5arpita.dto.CheckoutRequest;
import com.n5arpita.model.*;
import com.n5arpita.repository.AddressRepository;
import com.n5arpita.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CartService cartService;

    @Transactional
    public Order createOrder(User user, CheckoutRequest request) {
        Cart cart = cartService.getCartByUser(user);

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        Order order = new Order();
        order.setOrderNumber(generateOrderNumber());
        order.setUser(user);

        // Calculate totals
        BigDecimal subtotal = cart.getItems().stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setSubtotal(subtotal);
        order.setDiscount(BigDecimal.ZERO);
        order.setShippingCharge(BigDecimal.ZERO);
        order.setTotal(subtotal);

        // Copy address
        order.setShippingFullName(address.getFullName());
        order.setShippingPhone(address.getPhoneNumber());
        order.setShippingAddressLine1(address.getAddressLine1());
        order.setShippingAddressLine2(address.getAddressLine2());
        order.setShippingCity(address.getCity());
        order.setShippingState(address.getState());
        order.setShippingPincode(address.getPincode());

        order.setCouponCode(request.getCouponCode());
        order.setNotes(request.getNotes());

        // Create order items
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setProductName(cartItem.getProduct().getName());
            orderItem.setProductSku(cartItem.getProduct().getSku());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            orderItem.setTotal(cartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));

            order.getItems().add(orderItem);
        }

        order = orderRepository.save(order);

        // Clear cart
        cartService.clearCart(user);

        return order;
    }

    private String generateOrderNumber() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        return "N5A" + timestamp;
    }

    public Page<Order> getUserOrders(User user, Pageable pageable) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId(), pageable);
    }

    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    @Transactional
    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = getOrderById(id);
        order.setStatus(status);

        if (status == Order.OrderStatus.DELIVERED) {
            order.setDeliveredAt(LocalDateTime.now());
        }

        return orderRepository.save(order);
    }

    @Transactional
    public Order updatePaymentStatus(Long id, Order.PaymentStatus status, String paymentId) {
        Order order = getOrderById(id);
        order.setPaymentStatus(status);
        order.setPaymentId(paymentId);

        if (status == Order.PaymentStatus.PAID) {
            order.setStatus(Order.OrderStatus.CONFIRMED);
        }

        return orderRepository.save(order);
    }
}
