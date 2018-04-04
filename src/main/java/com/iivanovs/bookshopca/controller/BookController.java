package com.iivanovs.bookshopca.controller;

import com.iivanovs.bookshopca.entity.Book;
import com.iivanovs.bookshopca.service.BookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/book")
public class BookController {

    public BookController() {
        super();
    }

    @Autowired
    private BookServiceImpl bookService;

    @RequestMapping(path = "/getall", method = RequestMethod.GET)
    ResponseEntity<?> getAll() {
        List<Book> books = this.bookService.findAll();

        if (books == null)
            return ResponseEntity.status(404).body("Can't get books");
        else {
            return ResponseEntity.ok(books);
        }
    }

    @RequestMapping(path = "/getbook", method = RequestMethod.GET)
    ResponseEntity<?> getBook(@RequestParam("id") long id) {
        Optional<Book> books = this.bookService.getOne(id);

        if (!books.isPresent())
            return ResponseEntity.status(404).body("Can't get books");
        else {
            return ResponseEntity.ok(books);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> create(@RequestBody Book book) {
        Book books = this.bookService.create(book);

        if (book == null)
            return ResponseEntity.status(404).body("Can't create books");
        else {
            return ResponseEntity.ok(books);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> update(@RequestBody Book book) {
        Book books = this.bookService.update(book);

        if (book == null)
            return ResponseEntity.status(404).body("Can't update books");
        else {
            return ResponseEntity.ok(books);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(params = "id", method = RequestMethod.DELETE)
    ResponseEntity<?> deleteById(@RequestParam("id") long id) {
        Book b = this.bookService.deleteById(id);

        if (b == null)
            return ResponseEntity.status(404).body("Can't delete");
        else
            return ResponseEntity.ok(b);
    }
}
