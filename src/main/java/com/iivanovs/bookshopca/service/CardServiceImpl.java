package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.Interface.CardService;
import com.iivanovs.bookshopca.entity.*;
import com.iivanovs.bookshopca.dao.CardDAO;
import com.iivanovs.bookshopca.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CardServiceImpl implements CardService {

    @Autowired
    private CardDAO cardDAO;

    @Autowired
    private UserDAO userDAO;

    @Override
    public User create(long id, Card card) {
        Optional<User> u = userDAO.findById(id);

        if (u.isPresent()) {
            Card c = null;
            if (card instanceof VisaCard)
                c = new VisaCard(card.getNumber(), card.getExpiryY(), card.getExpiryM(), card.getCvv());
            else if (card instanceof AECard)
                c = new AECard(card.getNumber(), card.getExpiryY(), card.getExpiryM(), card.getCvv());
            else if (card instanceof MasterCard)
                c = new MasterCard(card.getNumber(), card.getExpiryY(), card.getExpiryM(), card.getCvv());

            if (c != null) {
                c = cardDAO.save(c);
                User user = u.get();
                if (user.getCard() == null) {
                    user.setCard(c);
                    return userDAO.save(user);
                } else
                    return null;
            } else
                return null;
        } else
            return null;
    }

    @Override
    public User update(long id, Card card) {
        Optional<User> u = userDAO.findById(id);
        Optional<Card> c = cardDAO.findById(card.getId());

        if (u.isPresent() && c.isPresent()) {
            Card card1 = c.get();
            User user1 = u.get();
            if (card1.getClass() == card.getClass()) {
                card1.setNumber(card.getNumber());
                card1.setExpiryY(card.getExpiryY());
                card1.setExpiryM(card.getExpiryM());
                card1.setCvv(card.getCvv());
                cardDAO.save(card1);
            } else {
                user1.setCard(null);
                return create(user1.getId(),card);
            }
            return userDAO.save(user1);
        } else
            return null;

    }

    @Override
    public User delete(long user_id) {
        Optional<User> u = userDAO.findById(user_id);

        if (u.isPresent()) {
            User user = u.get();
            user.setCard(null);
            return userDAO.save(user);
        } else
            return null;

    }
}