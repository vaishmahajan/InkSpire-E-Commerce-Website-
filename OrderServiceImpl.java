package com.rk.service.impl;

import com.rk.dto.CartItemDto;
import com.rk.dto.CheckoutRequest;
import com.rk.entity.Order;
import com.rk.entity.OrderItem;
import com.rk.entity.Product;
import com.rk.repositories.OrderRepo;
import com.rk.repositories.ProductRepo;
import com.rk.service.OrderService;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;
    private final ProductRepo productRepo;

    public OrderServiceImpl(OrderRepo orderRepo, ProductRepo productRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
    }

    @Override
    @Transactional
    public Order placeOrder(CheckoutRequest request) {
        List<OrderItem> orderItems = new ArrayList<>();
        double calculatedTotal = 0;

        for (CartItemDto itemDto : request.getItems()) {
            Product product = productRepo.findById(itemDto.getId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + itemDto.getName()));

            if (product.getQuantity() < itemDto.getQuantity()) {
                throw new RuntimeException("Insufficient stock for " + product.getName() + ". Available: " + product.getQuantity());
            }

            calculatedTotal += itemDto.getPrice() * itemDto.getQuantity();
        }

        Order newOrder = new Order();
        newOrder.setCustomerName(request.getCustomerName());
        newOrder.setCustomerEmail(request.getCustomerEmail());
        newOrder.setTotalAmount(calculatedTotal);
        newOrder.setItems(orderItems); 
        
        for (CartItemDto itemDto : request.getItems()) {
            Product product = productRepo.findById(itemDto.getId()).get(); 

            OrderItem orderItem = new OrderItem(null, newOrder, product.getId(), product.getName(), product.getPrice(), itemDto.getQuantity());
            orderItems.add(orderItem);

            product.setQuantity(product.getQuantity() - itemDto.getQuantity());
            productRepo.save(product);
        }

        return orderRepo.save(newOrder);
    }
}