package com.iivanovs.bookshopca.Interface;

import com.iivanovs.bookshopca.entity.Card;
import com.iivanovs.bookshopca.entity.User;

public interface CardService {
    public User create(long id, Card card);

    public User update(long id, Card card);

    public User delete(long user_id);
}
