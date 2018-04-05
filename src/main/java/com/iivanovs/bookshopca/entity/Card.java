package com.iivanovs.bookshopca.entity;

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
public class Card implements Serializable {

    //every entity requires an id, I will auto generate it
    @Id
    @GenericGenerator(name = "generator", strategy = "increment")
    @GeneratedValue(generator = "generator")
    private long id;

    private String number;

    private String expiry;

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

    public Card(String number, String expiry, String cvv) {
        this.number = number;
        this.expiry = expiry;
        this.cvv = cvv;
    }

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

    public String getExpiry() {
        return expiry;
    }

    public void setExpiry(String expiry) {
        this.expiry = expiry;
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
}
