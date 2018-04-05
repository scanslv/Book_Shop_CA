package com.iivanovs.bookshopca.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

@Entity
public class Address implements Serializable {

    //every entity requires an id, I will auto generate it
    @Id
    @GenericGenerator(name = "generator", strategy = "increment")
    @GeneratedValue(generator = "generator")
    private long id;

    private String line1;

    private String line2;

    private String city;

    private String postCode;

    private String country;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date", nullable = false)
    private Date create_date;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "reg_date", nullable = false)
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

    public Address() {
        super();
    }

    public Address(String line1, String line2, String city, String postCode, String country) {
        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.postCode = postCode;
        this.country = country;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLine1() {
        return line1;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    public String getLine2() {
        return line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
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
