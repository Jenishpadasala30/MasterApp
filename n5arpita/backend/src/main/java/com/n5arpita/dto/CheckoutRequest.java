package com.n5arpita.dto;

import lombok.Data;

@Data
public class CheckoutRequest {
    private Long addressId;
    private String couponCode;
    private String notes;
}
