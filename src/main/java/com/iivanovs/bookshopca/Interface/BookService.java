package com.iivanovs.bookshopca.Interface;

import com.iivanovs.bookshopca.entity.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {
    public List<Book> findAll();

    public Optional<Book> getOne(long id);

    public List<Book> search(String query);

    public Book create(Book book);

    public Book update(Book book);

    public Book deleteById(long id);
}
