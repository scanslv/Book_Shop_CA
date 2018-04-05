package com.iivanovs.bookshopca.controller;

import com.iivanovs.bookshopca.entity.Book;
import com.iivanovs.bookshopca.entity.Comment;
import com.iivanovs.bookshopca.service.CommentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
public class CommentController {

    public CommentController() {
        super();
    }

    @Autowired
    private CommentServiceImpl commentService;

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> create(@RequestParam("user_id") long user_id,
                             @RequestParam("book_id") long book_id,
                             @RequestBody Comment comment) {
        Book book = this.commentService.create(user_id, book_id, comment);

        if (book == null)
            return ResponseEntity.status(404).body("Can't create comment");
        else {
            return ResponseEntity.ok(book);
        }
    }
}
