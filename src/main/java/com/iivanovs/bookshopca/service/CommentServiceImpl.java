package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.Interface.CommentService;
import com.iivanovs.bookshopca.entity.Book;
import com.iivanovs.bookshopca.entity.Comment;
import com.iivanovs.bookshopca.entity.User;
import com.iivanovs.bookshopca.dao.BookDAO;
import com.iivanovs.bookshopca.dao.CommentDAO;
import com.iivanovs.bookshopca.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentDAO commentDAO;

    @Autowired
    private BookDAO bookDAO;

    @Autowired
    private UserDAO userDAO;

    @Override
    public Book create(long user_id, long book_id, Comment comment) {
        Optional<User> u = userDAO.findById(user_id);
        Optional<Book> b = bookDAO.findById(book_id);

        if(u.isPresent() && b.isPresent()){
            Comment c = new Comment(comment.getContent(), comment.getRating());
            c = commentDAO.save(c);
            User user = u.get();
            Book book = b.get();

            user.getComments().add(c);
            userDAO.save(user);

            book.getComments().add(c);

            return bookDAO.save(book);
        }else
            return null;
    }
}