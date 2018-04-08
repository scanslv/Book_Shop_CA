package com.iivanovs.bookshopca.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.io.Serializable;

@Entity
@DiscriminatorValue("Mastercard")
public class MasterCard extends Card implements Serializable{
    public MasterCard() {}

    public MasterCard(long number, long expiryY, long expiryM, long cvv) {
        super(number, expiryY, expiryM, cvv);
    }

    @Override
    public String getType() {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }
}
