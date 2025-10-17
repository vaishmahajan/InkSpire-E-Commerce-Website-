package com.rk.service;

import com.rk.dto.CheckoutRequest;
import com.rk.entity.Order;

public interface OrderService {
    Order placeOrder(CheckoutRequest request);
}