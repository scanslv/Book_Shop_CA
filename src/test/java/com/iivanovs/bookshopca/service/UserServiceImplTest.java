package com.iivanovs.bookshopca.service;
import com.iivanovs.bookshopca.BookshopcaApplication;
import com.iivanovs.bookshopca.dao.*;
import com.iivanovs.bookshopca.entity.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = BookshopcaApplication.class)
@TestPropertySource(locations = "classpath:application-test.properties")
public class UserServiceImplTest {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private AddressDAO addressDAO;

    @Autowired
    private BookDAO bookDAO;

    @Autowired
    private CardDAO cardDAO;

    @Autowired
    private CommentDAO commentDAO;

    private User user, user2;
    private Address address;
    private Book book;
    private Card card;
    private Comment comment;

    @Before
    public void createObj() {
        user = new AdminUser("name", "surname", "phone", "email", "password",
                "gender", "dob");
        user2 = new OrdinaryUser("name", "surname", "phone", "email", "password",
                "gender", "dob");
        address = new Address( "line1",  "line2",  "city",  "postCode",  "country");
        book = new Book( "title", "author", 10.00, "category",  "image", 10);
        card = new VisaCard( "number", 2018, 12, "cvv");
        comment = new Comment( "content", "rating");
    }

    @Test
    @Transactional
    @Rollback(true)
    public void findOne() {
        User theUser = userDAO.save(user);

        Assert.assertTrue(userDAO.findById(theUser.getId()).isPresent());
        Assert.assertEquals(user.getName(), theUser.getName());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void findAll() {
        User theUser = userDAO.save(user);
        User theUser2 = userDAO.save(user2);

        ArrayList<User> users = (ArrayList<User>) userDAO.findAll();
        Assert.assertTrue((users.size() == 2));

        userDAO.delete(theUser);
        userDAO.delete(theUser2);
        ArrayList<User> usersAfter = (ArrayList<User>) userDAO.findAll();
        Assert.assertTrue((usersAfter.size() == 0));
    }

    @Test
    @Transactional
    @Rollback(true)
    public void delete() throws Exception {
        User theUser = userDAO.save(user);

        Assert.assertTrue(userDAO.findById(theUser.getId()).isPresent());
        userDAO.delete(userDAO.findById(theUser.getId()).get());
        Assert.assertFalse(userDAO.findById(theUser.getId()).isPresent());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void create() throws Exception {
        User theUser = userDAO.save(user);
        Assert.assertTrue(userDAO.findById(theUser.getId()).isPresent());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void update() throws Exception {
        User theUser = userDAO.save(user);
        Assert.assertTrue(userDAO.findById(theUser.getId()).isPresent());
        String newValue = "newName";

        theUser.setName(newValue);
        theUser = userDAO.save(theUser);
        Assert.assertEquals(newValue, (userDAO.findById(theUser.getId()).get().getName()));
    }

    @Test
    @Transactional
    @Rollback(true)
    public void purchaseBook() throws Exception {
        User theUser = userDAO.save(user);
        Book theBook = bookDAO.save(book);

        Assert.assertTrue(bookDAO.findById(theBook.getId()).isPresent());

        Assert.assertTrue(theUser.getBooks_purchased().size() == 0);

        theUser.getBooks_purchased().add(theBook);
        theUser = userDAO.save(theUser);

        Assert.assertTrue(theUser.getBooks_purchased().size() > 0);

        userDAO.delete(theUser);
        Assert.assertFalse(userDAO.findById(theUser.getId()).isPresent());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void addAddress() throws Exception {
        User theUser = userDAO.save(user);
        Address theAddress = addressDAO.save(address);

        Assert.assertTrue(addressDAO.findById(theAddress.getId()).isPresent());

        Assert.assertNull(theUser.getAddress());

        theUser.setAddress(theAddress);
        theUser = userDAO.save(theUser);

        Assert.assertNotNull(theUser.getAddress());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void addCard() throws Exception {
        User theUser = userDAO.save(user);
        Card theCard = cardDAO.save(card);

        Assert.assertTrue(cardDAO.findById(theCard.getId()).isPresent());

        Assert.assertNull(theUser.getAddress());

        theUser.setCard(theCard);
        theUser = userDAO.save(theUser);

        Assert.assertNotNull(theUser.getCard());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void createComment() throws Exception {
        User theUser = userDAO.save(user);
        Comment theComment = commentDAO.save(comment);

        Assert.assertTrue(commentDAO.findById(theComment.getId()).isPresent());

        Assert.assertTrue(theUser.getComments().size() == 0);

        theUser.getComments().add(theComment);
        theUser = userDAO.save(theUser);

        Assert.assertTrue(theUser.getComments().size() > 0);
    }
}