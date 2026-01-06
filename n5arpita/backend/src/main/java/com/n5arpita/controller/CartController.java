package com.n5arpita.controller;

import com.n5arpita.config.CustomUserDetailsService;
import com.n5arpita.dto.AddToCartRequest;
import com.n5arpita.model.Cart;
import com.n5arpita.model.User;
import com.n5arpita.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @GetMapping
    public ResponseEntity<Cart> getCart(Authentication authentication) {
        User user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(cartService.getCartByUser(user));
    }

    @PostMapping("/items")
    public ResponseEntity<Cart> addToCart(@RequestBody AddToCartRequest request, Authentication authentication) {
        User user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(cartService.addToCart(user, request));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<Cart> updateCartItem(
            @PathVariable Long productId,
            @RequestParam Integer quantity,
            Authentication authentication) {
        User user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(cartService.updateCartItem(user, productId, quantity));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<Cart> removeFromCart(@PathVariable Long productId, Authentication authentication) {
        User user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(cartService.removeFromCart(user, productId));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(Authentication authentication) {
        User user = userDetailsService.getUserByEmail(authentication.getName());
        cartService.clearCart(user);
        return ResponseEntity.ok().build();
    }
}
