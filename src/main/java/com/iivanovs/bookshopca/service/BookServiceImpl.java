package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.Interface.BookService;
import com.iivanovs.bookshopca.entity.Book;
import com.iivanovs.bookshopca.dao.BookDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDAO bookDAO;

    @Override
    public List<Book> findAll() {
        return (List<Book>) bookDAO.findAll();
    }

    @Override
    public Optional<Book> getOne(long id) {
        return bookDAO.findById(id);
    }

    @Override
    public List<Book> search(String query) {
        List<Book> books = (List<Book>) bookDAO.findAll();
        List<Book> foundBooks = new ArrayList<>();

        for (Book book : books) {
            if (book.getCategory().equalsIgnoreCase(query) ||
                    book.getTitle().toLowerCase().contains(query.toLowerCase()) ||
                    book.getAuthor().toLowerCase().contains(query.toLowerCase()))
                foundBooks.add(book);
        }

        return foundBooks;
    }

    @Override
    public Book create(Book book) {
        Book book1 = new Book(book.getTitle(), book.getAuthor(), book.getPrice(), book.getCategory(), book.getImage(), book.getAvailable());
        return bookDAO.save(book1);
    }

    @Override
    public Book update(Book book) {
        Optional<Book> book1 = bookDAO.findById(book.getId());
        if (book1.isPresent()) {
            Book b = book1.get();
            b.setTitle(book.getTitle());
            b.setAuthor(book.getAuthor());
            b.setPrice(book.getPrice());
            b.setCategory(book.getCategory());
            b.setImage(book.getImage());
            b.setAvailable(book.getAvailable());

            return bookDAO.save(b);
        } else
            return null;
    }

    @Override
    public Book deleteById(long id) {
        Optional<Book> user = bookDAO.findById(id);
        if (user.isPresent()) {
            bookDAO.deleteById(id);
            return user.get();
        } else
            return null;
    }
}