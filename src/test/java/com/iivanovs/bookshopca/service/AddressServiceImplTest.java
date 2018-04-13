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
public class AddressServiceImplTest {

    @Autowired
    private AddressDAO addressDAO;

    private Address address, address2;

    @Before
    public void createObj() {
        address = new Address( "line1",  "line2",  "city",  "postCode",  "country");
        address2 = new Address( "line1",  "line2",  "city",  "postCode",  "country");
    }

    @Test
    @Transactional
    @Rollback(true)
    public void findOne() {
        Address theAddress = addressDAO.save(address);

        Assert.assertTrue(addressDAO.findById(theAddress.getId()).isPresent());
        Assert.assertEquals(address.getCountry(), theAddress.getCountry());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void findAll() {
        Address theAddress = addressDAO.save(address);
        Address theAddress2 = addressDAO.save(address2);

        ArrayList<Address> addresss = (ArrayList<Address>) addressDAO.findAll();
        Assert.assertTrue((addresss.size() == 2));

        addressDAO.delete(theAddress);
        addressDAO.delete(theAddress2);
        ArrayList<Address> addresssAfter = (ArrayList<Address>) addressDAO.findAll();
        Assert.assertTrue((addresssAfter.size() == 0));
    }

    @Test
    @Transactional
    @Rollback(true)
    public void delete() throws Exception {
        Address theAddress = addressDAO.save(address);

        Assert.assertTrue(addressDAO.findById(theAddress.getId()).isPresent());
        addressDAO.delete(addressDAO.findById(theAddress.getId()).get());
        Assert.assertFalse(addressDAO.findById(theAddress.getId()).isPresent());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void create() throws Exception {
        Address theAddress = addressDAO.save(address);
        Assert.assertTrue(addressDAO.findById(theAddress.getId()).isPresent());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void update() throws Exception {
        Address theAddress = addressDAO.save(address);
        Assert.assertTrue(addressDAO.findById(theAddress.getId()).isPresent());
        String newValue = "newCountry";

        theAddress.setCountry(newValue);
        theAddress = addressDAO.save(theAddress);
        Assert.assertEquals(newValue, (addressDAO.findById(theAddress.getId()).get().getCountry()));
    }
}