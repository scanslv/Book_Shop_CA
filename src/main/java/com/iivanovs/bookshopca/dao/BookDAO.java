package com.iivanovs.bookshopca.dao;

import com.iivanovs.bookshopca.entity.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookDAO extends CrudRepository<Book, Long> {
}
