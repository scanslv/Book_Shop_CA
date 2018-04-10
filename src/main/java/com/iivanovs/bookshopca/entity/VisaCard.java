package com.iivanovs.bookshopca.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@DiscriminatorValue("Visa")
public class VisaCard extends Card implements Serializable {
    public VisaCard() {
    }

    public VisaCard(String number, long expiryY, long expiryM, String cvv) {
        super(number, expiryY, expiryM, cvv);
    }

    @Override
    public String getType() {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }

    @Override
    public boolean checkNumberOfDigits() {
        int numberOfDigits = this.getNumber().length();
        return numberOfDigits == 13 || numberOfDigits == 16;
    }

    @Override
    public boolean checkValidPrefix() {
        String firstDigit = this.getNumber().substring(0, 1);
        return firstDigit.equals("4");
    }
}
