package com.iivanovs.bookshopca.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@DiscriminatorValue("Visa")
public class VisaCard  extends Card implements Serializable{
    public VisaCard() {}

    public VisaCard(long number, long expiryY, long expiryM, long cvv) {
        super(number, expiryY, expiryM, cvv);
    }

    @Override
    public String getType() {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }
}
