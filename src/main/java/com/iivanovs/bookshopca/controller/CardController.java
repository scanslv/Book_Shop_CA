package com.iivanovs.bookshopca.controller;

import com.iivanovs.bookshopca.entity.Card;
import com.iivanovs.bookshopca.entity.User;
import com.iivanovs.bookshopca.service.CardServiceImpl;
import com.iivanovs.bookshopca.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/card")
public class CardController {

    public CardController() {
        super();
    }

    @Autowired
    private CardServiceImpl cardService;

    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> create(Principal principal,
                             @RequestParam("id") long user_id,
                             @RequestBody Card card) {
        Optional<User> u = userService.findOne(user_id);
        if (u.isPresent() && u.get().getEmail().equalsIgnoreCase(principal.getName())) {
            User user = this.cardService.create(user_id, card);

            if (user == null)
                return ResponseEntity.status(404).body("Can't create card");
            else {
                return ResponseEntity.ok(user);
            }
        } else
            return ResponseEntity.status(404).body("Can't create card");
    }

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> update(Principal principal,
                             @RequestParam("id") long user_id,
                             @RequestBody Card card) {
        Optional<User> u = userService.findOne(user_id);
        if (u.isPresent() && u.get().getEmail().equalsIgnoreCase(principal.getName())) {
            User user = this.cardService.update(user_id, card);

            if (user == null)
                return ResponseEntity.status(404).body("Can't update card");
            else {
                return ResponseEntity.ok(user);
            }
        } else
            return ResponseEntity.status(404).body("Can't update card");
    }

    @RequestMapping(method = RequestMethod.DELETE)
    ResponseEntity<?> delete(Principal principal,
                             @RequestParam("id") long user_id) {
        Optional<User> u = userService.findOne(user_id);
        if (u.isPresent() && u.get().getEmail().equalsIgnoreCase(principal.getName())) {
            User user = this.cardService.delete(user_id);

            if (user == null)
                return ResponseEntity.status(404).body("Can't delete card");
            else {
                return ResponseEntity.ok(user);
            }
        } else
            return ResponseEntity.status(404).body("Can't delete card");
    }
}
