package com.iivanovs.bookshopca.dao;

import com.iivanovs.bookshopca.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDAO extends CrudRepository<User, Long> {

    @Query(value = "select * from user u where u.email=:email", nativeQuery = true)
    public User findByUsername(@Param("email") String email);

    @Query(value = "select * from user u where u.email=:email and u.password=:password", nativeQuery = true)
    public User login(@Param("email") String email, @Param("password") String password);

    @Query(value = "select * from user u where u.email=:email", nativeQuery = true)
    public List<User> checkEmail(@Param("email") String email);
}
