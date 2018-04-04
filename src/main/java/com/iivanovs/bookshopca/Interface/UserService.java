package com.iivanovs.bookshopca.Interface;

import com.iivanovs.bookshopca.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public Iterable<User> findAll();

    public Optional<User> findOne(long id);

    public User deleteById(long id);

    public User create(User user);

    public User update(User user);

    public User login(String email, String password);

    public List<User> checkEmail(String email);
}
