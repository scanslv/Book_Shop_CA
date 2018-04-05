package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.Interface.BookService;
import com.iivanovs.bookshopca.Interface.CommentService;
import com.iivanovs.bookshopca.entity.Book;
import com.iivanovs.bookshopca.entity.Comment;
import com.iivanovs.bookshopca.entity.User;
import com.iivanovs.bookshopca.repository.BookRepository;
import com.iivanovs.bookshopca.repository.CommentRepository;
import com.iivanovs.bookshopca.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Book create(long user_id, long book_id, Comment comment) {
        Optional<User> u = userRepository.findById(user_id);
        Optional<Book> b = bookRepository.findById(book_id);

        if(u.isPresent() && b.isPresent()){
            Comment c = new Comment(comment.getContent(), comment.getRating());
            c = commentRepository.save(c);
            User user = u.get();
            Book book = b.get();

            user.getComments().add(c);
            userRepository.save(user);

            book.getComments().add(c);

            return bookRepository.save(book);
        }else
            return null;
    }
}