package com.iivanovs.bookshopca.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.io.Serializable;

@Entity
@DiscriminatorValue("ROLE_ADMIN")
public class AdminUser extends User implements Serializable {
    public AdminUser() {
    }

    public AdminUser(String name, String surname, String phone, String email, String password, String gender, String dob) {
        super(name, surname, phone, email, password, gender, dob);
    }

    @Override
    public String getRole()  {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }
}