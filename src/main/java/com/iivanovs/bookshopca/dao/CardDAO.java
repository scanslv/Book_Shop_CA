package com.iivanovs.bookshopca.dao;

import com.iivanovs.bookshopca.entity.Card;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardDAO extends CrudRepository<Card, Long> {
}
