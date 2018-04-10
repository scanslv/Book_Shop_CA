package com.iivanovs.bookshopca.entity;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.iivanovs.bookshopca.security.RolesEnum;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType=DiscriminatorType.STRING, length=20)
@JsonTypeInfo(use=JsonTypeInfo.Id.NAME,include=JsonTypeInfo.As.PROPERTY,property="type")
@JsonSubTypes({
        @JsonSubTypes.Type(name="Visa",value=VisaCard.class),
        @JsonSubTypes.Type(name="Mastercard",value=MasterCard.class),
        @JsonSubTypes.Type(name="American Express",value=AECard.class)})
public abstract class Card implements Serializable {

    //every entity requires an id, I will auto generate it
    @Id
    @GenericGenerator(name = "generator", strategy = "increment")
    @GeneratedValue(generator = "generator")
    private long id;
    private String number;
    private long expiryY;
    private long expiryM;
    private String cvv;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date", nullable = false)
    private Date create_date;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "mod_date", nullable = false)
    private Date mod_date;

    @PrePersist
    protected void onCreate() {
        Date date = Calendar.getInstance().getTime();
        create_date = date;
        mod_date = date;
    }

    @PreUpdate
    protected void onUpdate() {
        mod_date = Calendar.getInstance().getTime();
    }

    public Card() {
        super();
    }

    public Card(String number, long expiryY, long expiryM, String cvv) {
        this.number = number;
        this.expiryY = expiryY;
        this.expiryM = expiryM;
        this.cvv = cvv;
    }

    @Transient
    public abstract String getType();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public long getExpiryY() {
        return expiryY;
    }

    public void setExpiryY(long expiryY) {
        this.expiryY = expiryY;
    }

    public long getExpiryM() {
        return expiryM;
    }

    public void setExpiryM(long expiryM) {
        this.expiryM = expiryM;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public Date getCreate_date() {
        return create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
    }

    public Date getMod_date() {
        return mod_date;
    }

    public void setMod_date(Date mod_date) {
        this.mod_date = mod_date;
    }


    public boolean validate() {

        if (!checkExpiryDateValid()) {
            return false;
        }
        if (!checkAllCharsDigits(this.number)) {
            return false;
        }
        if (!checkNumberOfDigits()) {
            return false;
        }
        if (!checkValidPrefix()) {
            return false;
        }
        if (!checkCheckSumDigit()) {
            return false;
        }
        if (!checkAllCharsDigits(this.cvv)) {
            return false;
        }
        if (!checkCVVLength()) {
            return false;
        }
        return true;
    }

    private boolean checkExpiryDateValid() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        int currentMonth = cal.get(Calendar.MONTH) + 1;
        int currentYear = cal.get(Calendar.YEAR);

        return currentYear <= this.expiryY && (currentYear != this.expiryY || currentMonth <= this.expiryY);
    }

    private boolean checkAllCharsDigits(String num) {
        String validDigits = "0123456789";
        boolean result = true;

        for (int i = 0; i < this.number.length(); i++) {
            if (!validDigits.contains(this.number.substring(i, i + 1))) {
                result = false;
                break;
            }
        }

        return result;
    }

    public abstract boolean checkNumberOfDigits();

    public abstract boolean checkValidPrefix();

    private boolean checkCheckSumDigit() {
        boolean result = true;
        int sum = 0;
        int multiplier = 1;
        int stringLength = this.number.length();

        for (int i = 0; i < stringLength; i++) {
            String currentDigit = this.number.substring(stringLength - i - 1, stringLength - i);
            int currentProduct = new Integer(currentDigit) * multiplier;
            if (currentProduct >= 10)
                sum += (currentProduct % 10) + 1;
            else
                sum += currentProduct;
            if (multiplier == 1)
                multiplier++;
            else
                multiplier--;
        }
        if ((sum % 10) != 0)
            result = false;

        return result;
    }

    public boolean checkCVVLength() {
        int numberOfDigits = this.cvv.length();
        return numberOfDigits == 3;
    }
}
