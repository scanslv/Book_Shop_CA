package com.iivanovs.bookshopca.repository;

import com.iivanovs.bookshopca.entity.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {
}
