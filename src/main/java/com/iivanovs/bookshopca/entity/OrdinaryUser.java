package com.iivanovs.bookshopca.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.io.Serializable;

@Entity
@DiscriminatorValue("ROLE_USER")
public class OrdinaryUser extends User implements Serializable {
    public OrdinaryUser() {
    }

    public OrdinaryUser(String name, String surname, String phone, String email, String password, String gender, String dob) {
        super(name, surname, phone, email, password, gender, dob);
    }

    @Override
    public String getRole()  {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }
}