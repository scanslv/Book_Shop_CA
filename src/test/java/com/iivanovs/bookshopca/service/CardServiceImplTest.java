package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.BookshopcaApplication;
import com.iivanovs.bookshopca.dao.CardDAO;
import com.iivanovs.bookshopca.entity.Card;
import com.iivanovs.bookshopca.entity.MasterCard;
import com.iivanovs.bookshopca.entity.VisaCard;
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
public class CardServiceImplTest {

    @Autowired
    private CardDAO cardDAO;

    private Card card, card2;

    @Before
    public void createObj() {
        card = new VisaCard( "number", 2018, 12, "cvv");
        card2 = new MasterCard( "number", 2018, 12, "cvv");
    }

    @Test
    @Transactional
    @Rollback(true)
    public void findOne() {
        Card theCard = cardDAO.save(card);

        Assert.assertTrue(cardDAO.findById(theCard.getId()).isPresent());
        Assert.assertEquals(card.getNumber(), theCard.getNumber());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void findAll() {
        Card theCard = cardDAO.save(card);
        Card theCard2 = cardDAO.save(card2);

        ArrayList<Card> cards = (ArrayList<Card>) cardDAO.findAll();
        Assert.assertTrue((cards.size() == 2));

        cardDAO.delete(theCard);
        cardDAO.delete(theCard2);
        ArrayList<Card> cardsAfter = (ArrayList<Card>) cardDAO.findAll();
        Assert.assertTrue((cardsAfter.size() == 0));
    }

    @Test
    @Transactional
    @Rollback(true)
    public void delete() throws Exception {
        Card theCard = cardDAO.save(card);

        Assert.assertTrue(cardDAO.findById(theCard.getId()).isPresent());
        cardDAO.delete(cardDAO.findById(theCard.getId()).get());
        Assert.assertFalse(cardDAO.findById(theCard.getId()).isPresent());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void create() throws Exception {
        Card theCard = cardDAO.save(card);
        Assert.assertTrue(cardDAO.findById(theCard.getId()).isPresent());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void update() throws Exception {
        Card theCard = cardDAO.save(card);
        Assert.assertTrue(cardDAO.findById(theCard.getId()).isPresent());
        String newValue = "newNumber";

        theCard.setNumber(newValue);
        theCard = cardDAO.save(theCard);
        Assert.assertEquals(newValue, (cardDAO.findById(theCard.getId()).get().getNumber()));
    }
}