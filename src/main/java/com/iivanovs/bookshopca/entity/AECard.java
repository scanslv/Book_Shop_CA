package com.iivanovs.bookshopca.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.io.Serializable;

@Entity
@DiscriminatorValue("American Express")
public class AECard extends Card implements Serializable {
    public AECard() {
    }

    public AECard(long number, long expiryY, long expiryM, long cvv) {
        super(number, expiryY, expiryM, cvv);
    }

    @Override
    public String getType() {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }
}