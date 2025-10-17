package com.rk.service;

import com.rk.entity.Product;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getAllProducts();
    Product addProduct(String name, String description, double price, int quantity, MultipartFile imageFile) throws IOException;
    Product updateProduct(Long id, String name, String description, double price, int quantity, Optional<MultipartFile> imageFile) throws IOException;
    Product toggleVisibility(Long id);

    List<Product> getVisibleProducts();
    Optional<Product> getProductById(Long id);
}