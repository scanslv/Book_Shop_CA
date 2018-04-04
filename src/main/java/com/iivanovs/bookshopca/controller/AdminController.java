package com.iivanovs.bookshopca.controller;

import com.iivanovs.bookshopca.entity.User;
import com.iivanovs.bookshopca.service.UserServiceImpl;
import com.iivanovs.bookshopca.util.ForbiddenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/admin")
public class AdminController {

    public AdminController() {
        super();
    }

    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(params = {"id"}, method = RequestMethod.GET)
    public ResponseEntity<?> getById(@RequestParam("id") long id) {
        Optional<User> u = this.userService.findOne(id);

        if (u == null)
            return ResponseEntity.status(404).body("Can't fetch user");
        else
            return ResponseEntity.ok(u);

    }

    @RequestMapping(path = "/getallusers", method = RequestMethod.GET)
    public ResponseEntity<?> getAllUsers() {
        List<User> u = (List<User>) this.userService.findAll();

        if (u == null)
            return ResponseEntity.status(404).body("Cant get users");
        else
            return ResponseEntity.ok(u);
    }

    @RequestMapping(path = "/updateuser", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        User u = this.userService.update(user);

        if (u == null)
            return ResponseEntity.status(404).body("Update failed");
        else
            return ResponseEntity.ok(u);
    }

    @RequestMapping(path = "/deleteuser", params = {"id"}, method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteuser(@RequestParam("id") long id) {
        User u = this.userService.deleteById(id);

        if (u == null)
            return ResponseEntity.status(404).body("Update failed");
        else
            return ResponseEntity.ok(u);
    }
}
