package com.iivanovs.bookshopca.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@DiscriminatorValue("American Express")
public class AECard extends Card implements Serializable {
    public AECard() {
    }

    public AECard(String number, long expiryY, long expiryM, String cvv) {
        super(number, expiryY, expiryM, cvv);
    }

    @Override
    public String getType() {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }

    @Override
    public boolean checkNumberOfDigits() {
        int numberOfDigits = this.getNumber().length();
        return numberOfDigits == 15;
    }

    @Override
    public boolean checkValidPrefix() {
        String prefix = this.getNumber().substring(0, 2);
        return prefix.substring(0, 1).equals("3") || prefix.equals("37");
    }
}