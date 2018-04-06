package com.iivanovs.bookshopca.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.iivanovs.bookshopca.security.RolesEnum;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Entity
public class User implements Serializable {

    //every entity requires an id, I will auto generate it
    @Id
    @GenericGenerator(name = "generator", strategy = "increment")
    @GeneratedValue(generator = "generator")
    private long id;

    private String name;

    private String surname;

    private String phone;

    private String email;

    private String password;

    private String gender;

    private String dob;

    private String role;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToOne(orphanRemoval = true, cascade = CascadeType.REMOVE)
    private Address address;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToOne(orphanRemoval = true, cascade = CascadeType.REMOVE)
    private Card card;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "reg_date", nullable = false)
    private Date reg_date;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "mod_date", nullable = false)
    private Date mod_date;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(cascade = CascadeType.REMOVE)
    private List<Book> books_purchased = new ArrayList<Book>();

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<Comment>();

    @PrePersist
    protected void onCreate() {
        Date date = Calendar.getInstance().getTime();
        reg_date = date;
        mod_date = date;
        role = RolesEnum.ROLE_USER.name();
    }

    @PreUpdate
    protected void onUpdate() {
        mod_date = Calendar.getInstance().getTime();
    }

    public User() {
        super();
    }

    public User(String name, String surname, String phone, String email, String password,
                String gender, String dob) {
        super();
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.dob = dob;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Date getReg_date() {
        return reg_date;
    }

    public void setReg_date(Date reg_date) {
        this.reg_date = reg_date;
    }

    public Date getMod_date() {
        return mod_date;
    }

    public void setMod_date(Date mod_date) {
        this.mod_date = mod_date;
    }

    public List<Book> getBooks_purchased() {
        return books_purchased;
    }

    public void setBooks_purchased(List<Book> books_purchased) {
        this.books_purchased = books_purchased;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }
}
