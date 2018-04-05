package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.Interface.AddressService;
import com.iivanovs.bookshopca.Interface.CardService;
import com.iivanovs.bookshopca.entity.Card;
import com.iivanovs.bookshopca.entity.User;
import com.iivanovs.bookshopca.repository.CardRepository;
import com.iivanovs.bookshopca.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CardServiceImpl implements CardService {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public User create(long id, Card card) {
        Optional<User> u = userRepository.findById(id);

        if (u.isPresent()) {
            Card c = new Card(card.getType(), card.getNumber(), card.getExpiryY(), card.getExpiryM(), card.getCvv());
            c = cardRepository.save(c);
            User user = u.get();
            if (user.getCard() == null) {
                user.setCard(c);
                return userRepository.save(user);
            } else
                return null;
        } else
            return null;
    }

    @Override
    public User update(long id, Card card) {
        Optional<User> u = userRepository.findById(id);
        Optional<Card> c = cardRepository.findById(card.getId());

        if (u.isPresent() && c.isPresent()) {
            Card card1 = c.get();
            card1.setType(card.getType());
            card1.setNumber(card.getNumber());
            card1.setExpiryY(card.getExpiryY());
            card1.setExpiryM(card.getExpiryM());
            card1.setCvv(card.getCvv());
            cardRepository.save(card1);

            return userRepository.save(u.get());
        } else
            return null;

    }

    @Override
    public User delete(long user_id) {
        Optional<User> u = userRepository.findById(user_id);

        if (u.isPresent()) {
            User user = u.get();
            user.setCard(null);
            return userRepository.save(user);
        } else
            return null;

    }
}