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
@RequestMapping("/user")
public class UserController {

    public UserController() {
        super();
    }

    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(params = "id", method = RequestMethod.GET)
    ResponseEntity<?> getById(Principal principal, @RequestParam("id") long id) {

        Optional<User> u = this.userService.findOne(id);

        if (u == null)
            return ResponseEntity.status(404).body("User not found");
        else {
            if (principal.getName().equalsIgnoreCase(u.get().getEmail()))
                return ResponseEntity.ok(u);
            else
                throw new ForbiddenException();
        }
    }

    @RequestMapping(params = {"email"}, method = RequestMethod.GET)
    public ResponseEntity<?> login(@RequestParam("email") String email) {

        User u = this.userService.login(email, null);

        if (u == null)
            return ResponseEntity.status(404).body("Wrong email/password combination");
        else
            return ResponseEntity.ok(u);
    }

    @RequestMapping(path = "/checkemail", params = "email", method = RequestMethod.GET)
    public ResponseEntity<?> checkEmail(@RequestParam("email") String email) {
        List<User> u = this.userService.checkEmail(email);

        if (u.size() == 0) {
            return ResponseEntity.status(200).body("email not yet registered");
        } else
            return ResponseEntity.status(202).build();
    }

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestBody User user) {
        User u = this.userService.create(user);

        if (u == null)
            return ResponseEntity.status(404).body("Registration failed");
        else
            return ResponseEntity.ok(u);
    }

    @RequestMapping(path = "/updateuser", method = RequestMethod.PUT)
    public ResponseEntity<?> update(Principal principal, @RequestBody User user) {
        Optional<User> user1 = userService.findOne(user.getId());

        if(user1.isPresent() && user1.get().getEmail().equalsIgnoreCase(principal.getName())) {
            User u = this.userService.update(user);

            if (u == null)
                return ResponseEntity.status(404).body("Update failed");
            else
                return ResponseEntity.ok(u);
        }else
            throw new ForbiddenException();
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping(params = "id", method = RequestMethod.DELETE)
    ResponseEntity<?> deleteById(Principal principal, @RequestParam("id") long id) {
        Optional<User> user1 = userService.findOne(id);

        if(user1.isPresent() && user1.get().getEmail().equalsIgnoreCase(principal.getName())) {
            User u = this.userService.deleteById(id);

            if (u == null)
                return ResponseEntity.status(404).body("Can't delete");
            else
                return ResponseEntity.ok(u);
        }else
            throw new ForbiddenException();
    }
}
