package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.Interface.BookService;
import com.iivanovs.bookshopca.entity.Book;
import com.iivanovs.bookshopca.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> findAll() {
        return (List<Book>) bookRepository.findAll();
    }

    @Override
    public Optional<Book> getOne(long id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book create(Book book) {
        Book book1 = new Book(book.getTitle(), book.getAuthor(), book.getPrice(), book.getCategory(), book.getImage());
        return bookRepository.save(book1);
    }

    @Override
    public Book update(Book book) {
        Optional<Book> book1 = bookRepository.findById(book.getId());
        if (book1.isPresent()) {
            Book b = book1.get();
            b.setTitle(book.getTitle());
            b.setAuthor(book.getAuthor());
            b.setPrice(book.getPrice());
            b.setCategory(book.getCategory());
            b.setImage(book.getImage());

            return bookRepository.save(b);
        } else
            return null;
    }

    @Override
    public Book deleteById(long id) {
        Optional<Book> user = bookRepository.findById(id);
        if (user.isPresent()) {
            bookRepository.deleteById(id);
            return user.get();
        } else
            return null;
    }
}