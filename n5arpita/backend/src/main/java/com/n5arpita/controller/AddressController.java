package com.n5arpita.controller;

import com.n5arpita.model.Address;
import com.n5arpita.model.User;
import com.n5arpita.repository.AddressRepository;
import com.n5arpita.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressController(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Address>> getUserAddresses(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Address> addresses = addressRepository.findByUserId(user.getId());
        return ResponseEntity.ok(addresses);
    }

    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody Address address, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        address.setUser(user);

        // If this is set as default, unset other defaults
        if (address.getIsDefault()) {
            List<Address> userAddresses = addressRepository.findByUserId(user.getId());
            userAddresses.forEach(addr -> {
                addr.setIsDefault(false);
                addressRepository.save(addr);
            });
        }

        Address savedAddress = addressRepository.save(address);
        return ResponseEntity.ok(savedAddress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address addressDetails,
            Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        // Verify ownership
        if (!address.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        address.setFullName(addressDetails.getFullName());
        address.setPhoneNumber(addressDetails.getPhoneNumber());
        address.setAddressLine1(addressDetails.getAddressLine1());
        address.setAddressLine2(addressDetails.getAddressLine2());
        address.setCity(addressDetails.getCity());
        address.setState(addressDetails.getState());
        address.setPincode(addressDetails.getPincode());

        // Handle default address change
        if (addressDetails.getIsDefault() && !address.getIsDefault()) {
            List<Address> userAddresses = addressRepository.findByUserId(user.getId());
            userAddresses.forEach(addr -> {
                addr.setIsDefault(false);
                addressRepository.save(addr);
            });
        }
        address.setIsDefault(addressDetails.getIsDefault());

        Address updatedAddress = addressRepository.save(address);
        return ResponseEntity.ok(updatedAddress);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        // Verify ownership
        if (!address.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        addressRepository.delete(address);
        return ResponseEntity.ok().body("Address deleted successfully");
    }
}
