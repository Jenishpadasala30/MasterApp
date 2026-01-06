package com.n5arpita.service;

import com.n5arpita.model.Product;
import com.n5arpita.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findByActiveTrue(pageable);
    }

    public Page<Product> getProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findByActiveTrueAndCategoryId(categoryId, pageable);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product getProductBySlug(String slug) {
        return productRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByActiveTrueAndFeaturedTrue();
    }

    public Page<Product> searchProducts(String query, Pageable pageable) {
        return productRepository.searchProducts(query, pageable);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);

        product.setName(productDetails.getName());
        product.setSlug(productDetails.getSlug());
        product.setDescription(productDetails.getDescription());
        product.setShortDescription(productDetails.getShortDescription());
        product.setPrice(productDetails.getPrice());
        product.setMrp(productDetails.getMrp());
        product.setSku(productDetails.getSku());
        product.setIngredients(productDetails.getIngredients());
        product.setUsage(productDetails.getUsage());
        product.setBenefits(productDetails.getBenefits());
        product.setSize(productDetails.getSize());
        product.setCategory(productDetails.getCategory());
        product.setActive(productDetails.getActive());
        product.setFeatured(productDetails.getFeatured());
        product.setStockQuantity(productDetails.getStockQuantity());

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        product.setActive(false);
        productRepository.save(product);
    }
}
