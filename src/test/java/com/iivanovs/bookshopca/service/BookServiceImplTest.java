package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.BookshopcaApplication;
import com.iivanovs.bookshopca.dao.BookDAO;
import com.iivanovs.bookshopca.dao.CommentDAO;
import com.iivanovs.bookshopca.entity.Book;
import com.iivanovs.bookshopca.entity.Comment;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = BookshopcaApplication.class)
@TestPropertySource(locations = "classpath:application-test.properties")
public class BookServiceImplTest {

    @Autowired
    private BookDAO bookDAO;

    @Autowired
    private CommentDAO commentDAO;

    private Book book, book2;
    private Comment comment;

    @Before
    public void createObj() {
        book = new Book( "title", "author", 10.00, "category",  "image", 10);
        book2 = new Book( "title", "author", 10.00, "category",  "image", 10);
        comment = new Comment( "content", "rating");
    }

    @Test
    @Transactional
    @Rollback(true)
    public void findOne() {
        Book theBook = bookDAO.save(book);

        Assert.assertTrue(bookDAO.findById(theBook.getId()).isPresent());
        Assert.assertEquals(book.getTitle(), theBook.getTitle());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void findAll() {
        Book theBook = bookDAO.save(book);
        Book theBook2 = bookDAO.save(book2);

        ArrayList<Book> books = (ArrayList<Book>) bookDAO.findAll();
        Assert.assertTrue((books.size() == 2));

        bookDAO.delete(theBook);
        bookDAO.delete(theBook2);
        ArrayList<Book> booksAfter = (ArrayList<Book>) bookDAO.findAll();
        Assert.assertTrue((booksAfter.size() == 0));
    }

    @Test
    @Transactional
    @Rollback(true)
    public void delete() throws Exception {
        Book theBook = bookDAO.save(book);

        Assert.assertTrue(bookDAO.findById(theBook.getId()).isPresent());
        bookDAO.delete(bookDAO.findById(theBook.getId()).get());
        Assert.assertFalse(bookDAO.findById(theBook.getId()).isPresent());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void create() throws Exception {
        Book theBook = bookDAO.save(book);
        Assert.assertTrue(bookDAO.findById(theBook.getId()).isPresent());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void update() throws Exception {
        Book theBook = bookDAO.save(book);
        Assert.assertTrue(bookDAO.findById(theBook.getId()).isPresent());
        String newValue = "newTitle";

        theBook.setTitle(newValue);
        theBook = bookDAO.save(theBook);
        Assert.assertEquals(newValue, (bookDAO.findById(theBook.getId()).get().getTitle()));
    }

    @Test
    @Transactional
    @Rollback(true)
    public void createComment() throws Exception {
        Book theBook = bookDAO.save(book);
        Comment theComment = commentDAO.save(comment);

        Assert.assertTrue(commentDAO.findById(theComment.getId()).isPresent());

        Assert.assertTrue(theBook.getComments().size() == 0);

        theBook.getComments().add(theComment);
        theBook = bookDAO.save(theBook);

        Assert.assertTrue(theBook.getComments().size() > 0);
    }
}