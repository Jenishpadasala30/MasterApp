package com.n5arpita.controller;

import com.n5arpita.model.Review;
import com.n5arpita.model.User;
import com.n5arpita.repository.ProductRepository;
import com.n5arpita.repository.ReviewRepository;
import com.n5arpita.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public ReviewController(ReviewRepository reviewRepository, UserRepository userRepository,
            ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductReviews(@PathVariable Long productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Map<String, Object> reviewData,
            Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long productId = Long.valueOf(reviewData.get("productId").toString());
        Integer rating = Integer.valueOf(reviewData.get("rating").toString());
        String comment = reviewData.get("comment").toString();

        Review review = new Review();
        review.setUser(user);
        review.setProduct(productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found")));
        review.setRating(rating);
        review.setComment(comment);
        review.setCreatedAt(LocalDateTime.now());

        Review savedReview = reviewRepository.save(review);

        // Update product average rating
        List<Review> allReviews = reviewRepository.findByProductId(productId);
        double avgRating = allReviews.stream().mapToInt(Review::getRating).average().orElse(0.0);
        var product = productRepository.findById(productId).get();
        product.setAverageRating(avgRating);
        product.setReviewCount(allReviews.size());
        productRepository.save(product);

        return ResponseEntity.ok(savedReview);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Not authorized");
        }

        reviewRepository.delete(review);
        return ResponseEntity.ok().body("Review deleted");
    }
}
