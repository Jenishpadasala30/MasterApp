package com.example.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://frontend:3000"})
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

	@GetMapping("/users")
	public ResponseEntity<Map<String, Object>> getAdminInfo() {
		Map<String, Object> response = new HashMap<>();
		response.put("message", "Admin endpoint accessed successfully");
		response.put("timestamp", System.currentTimeMillis());
		return ResponseEntity.ok(response);
	}
}

