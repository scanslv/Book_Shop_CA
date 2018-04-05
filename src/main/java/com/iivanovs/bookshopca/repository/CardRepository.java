package com.iivanovs.bookshopca.repository;

import com.iivanovs.bookshopca.entity.Card;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends CrudRepository<Card, Long> {
}
