package com.iivanovs.bookshopca.controller;

import com.iivanovs.bookshopca.entity.Address;
import com.iivanovs.bookshopca.entity.User;
import com.iivanovs.bookshopca.service.AddressServiceImpl;
import com.iivanovs.bookshopca.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/address")
public class AddressController {

    public AddressController() {
        super();
    }

    @Autowired
    private AddressServiceImpl addressService;

    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> create(Principal principal,
                             @RequestParam("id") long user_id,
                             @RequestBody Address address) {
        Optional<User> u = userService.findOne(user_id);
        if (u.isPresent() && u.get().getEmail().equalsIgnoreCase(principal.getName())) {
            User user = this.addressService.create(user_id, address);

            if (user == null)
                return ResponseEntity.status(404).body("Can't create address");
            else {
                return ResponseEntity.ok(user);
            }
        } else
            return ResponseEntity.status(404).body("Can't create address");
    }

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> update(Principal principal,
                             @RequestParam("id") long user_id,
                             @RequestBody Address address) {
        Optional<User> u = userService.findOne(user_id);
        if (u.isPresent() && u.get().getEmail().equalsIgnoreCase(principal.getName())) {
            User user = this.addressService.update(user_id, address);

            if (user == null)
                return ResponseEntity.status(404).body("Can't update address");
            else {
                return ResponseEntity.ok(user);
            }
        } else
            return ResponseEntity.status(404).body("Can't update address");
    }

    @RequestMapping(method = RequestMethod.DELETE)
    ResponseEntity<?> delete(Principal principal,
                             @RequestParam("id") long user_id) {
        Optional<User> u = userService.findOne(user_id);
        if (u.isPresent() && u.get().getEmail().equalsIgnoreCase(principal.getName())) {
            User user = this.addressService.delete(user_id);

            if (user == null)
                return ResponseEntity.status(404).body("Can't delete address");
            else {
                return ResponseEntity.ok(user);
            }
        } else
            return ResponseEntity.status(404).body("Can't delete address");
    }
}
