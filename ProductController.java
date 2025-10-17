package com.rk.controller;

import com.rk.entity.Product;
import com.rk.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*") 
@RequestMapping("/product/api") 
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Product>> getAllProductsForAdmin() {
        return ResponseEntity.ok(productService.getAllProducts());
    }
    
    @PostMapping(value = "/add", consumes = {"multipart/form-data"})
    public ResponseEntity<Product> addProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("quantity") int quantity,
            @RequestParam("image") MultipartFile image
    ) {
        try {
            Product newProduct = productService.addProduct(name, description, price, quantity, image);
            return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    
    @PutMapping(value = "/updateproduct/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("quantity") int quantity,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            Optional<MultipartFile> imageFile = Optional.ofNullable(image);
            Product updatedProduct = productService.updateProduct(id, name, description, price, quantity, imageFile);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException | IOException e) {
            // Using NOT_FOUND if ID is bad, or BAD_REQUEST for general update error
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    
    @PatchMapping("/toggle/{id}")
    public ResponseEntity<Product> toggleProductVisibility(@PathVariable Long id) {
        try {
            Product product = productService.toggleVisibility(id);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            // Using NOT_FOUND if the product ID doesn't exist
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
   
    @GetMapping("/list")
    public ResponseEntity<List<Product>> getVisibleProducts() {
        return ResponseEntity.ok(productService.getVisibleProducts());
    }
}