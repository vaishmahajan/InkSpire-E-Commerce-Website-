package com.rk.service.impl;

import com.rk.entity.Product;
import com.rk.repositories.ProductRepo;
import com.rk.service.ProductService;
import java.lang.String;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import jakarta.transaction.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;

    private final String uploadDir;

    public ProductServiceImpl(
            ProductRepo productRepo, 
            @Value("${file.upload-dir}") String uploadDir) { 
                
            this.productRepo = productRepo;
            this.uploadDir = uploadDir; // Assign injected value
            
            try {
                Files.createDirectories(Paths.get(this.uploadDir)); 
            } catch (IOException e) {
                throw new RuntimeException("Could not initialize storage directory: " + this.uploadDir, e);
            }
        }



    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @Override
    @Transactional
    public Product addProduct(String name, String description, double price, int quantity, MultipartFile imageFile) throws IOException {
        String fileName = storeFile(imageFile);
        Product product = new Product(null, name, description, price, quantity, fileName, true);
        return productRepo.save(product);
    }

    @Override
    @Transactional
    public Product updateProduct(Long id, String name, String description, double price, int quantity, Optional<MultipartFile> imageFile) throws IOException {
        Product existingProduct = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Update fields
        existingProduct.setName(name);
        existingProduct.setDescription(description);
        existingProduct.setPrice(price);
        existingProduct.setQuantity(quantity);

        if (imageFile.isPresent()) {
            String newFileName = storeFile(imageFile.get());
            existingProduct.setImage(newFileName);
        }

        return productRepo.save(existingProduct);
    }

    @Override
    @Transactional
    public Product toggleVisibility(Long id) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        product.setVisible(!product.isVisible());
        return productRepo.save(product);
    }

    

    @Override
    public List<Product> getVisibleProducts() {
        return productRepo.findByVisibleTrue();
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepo.findById(id);
    }

    private String storeFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Failed to store empty file.");
        }
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename != null && originalFilename.contains(".") ?
                originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
        
        // Generate a unique file name
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;
        Path targetLocation = Paths.get(uploadDir).resolve(uniqueFileName);

        Files.copy(file.getInputStream(), targetLocation);
        return uniqueFileName;
    }
}