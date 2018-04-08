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
    private long number;
    private long expiryY;
    private long expiryM;
    private long cvv;
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

    public Card(long number, long expiryY, long expiryM, long cvv) {
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

    public long getNumber() {
        return number;
    }

    public void setNumber(long number) {
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

    public long getCvv() {
        return cvv;
    }

    public void setCvv(long cvv) {
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
