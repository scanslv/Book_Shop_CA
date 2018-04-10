package com.iivanovs.bookshopca.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@DiscriminatorValue("Mastercard")
public class MasterCard extends Card implements Serializable{
    public MasterCard() {}

    public MasterCard(String number, long expiryY, long expiryM, String cvv) {
        super(number, expiryY, expiryM, cvv);
    }

    @Override
    public String getType() {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }

    @Override
    public boolean checkNumberOfDigits() {
        int numberOfDigits = this.getNumber().length();
        return numberOfDigits == 16;
    }

    @Override
    public boolean checkValidPrefix() {
        String prefix = this.getNumber().substring(0, 1);
        return prefix.equals("5");
    }
}
