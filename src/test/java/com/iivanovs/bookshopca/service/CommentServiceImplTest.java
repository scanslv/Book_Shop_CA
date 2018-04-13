package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.BookshopcaApplication;
import com.iivanovs.bookshopca.dao.CommentDAO;
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
public class CommentServiceImplTest {

    @Autowired
    private CommentDAO commentDAO;

    private Comment comment, comment2;

    @Before
    public void createObj() {
        comment = new Comment( "content", "rating");
        comment2 = new Comment( "content", "rating");
    }

    @Test
    @Transactional
    @Rollback(true)
    public void findOne() {
        Comment theComment = commentDAO.save(comment);

        Assert.assertTrue(commentDAO.findById(theComment.getId()).isPresent());
        Assert.assertEquals(comment.getContent(), theComment.getContent());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void findAll() {
        Comment theComment = commentDAO.save(comment);
        Comment theComment2 = commentDAO.save(comment2);

        ArrayList<Comment> comments = (ArrayList<Comment>) commentDAO.findAll();
        Assert.assertTrue((comments.size() == 2));

        commentDAO.delete(theComment);
        commentDAO.delete(theComment2);
        ArrayList<Comment> commentsAfter = (ArrayList<Comment>) commentDAO.findAll();
        Assert.assertTrue((commentsAfter.size() == 0));
    }

    @Test
    @Transactional
    @Rollback(true)
    public void delete() throws Exception {
        Comment theComment = commentDAO.save(comment);

        Assert.assertTrue(commentDAO.findById(theComment.getId()).isPresent());
        commentDAO.delete(commentDAO.findById(theComment.getId()).get());
        Assert.assertFalse(commentDAO.findById(theComment.getId()).isPresent());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void create() throws Exception {
        Comment theComment = commentDAO.save(comment);
        Assert.assertTrue(commentDAO.findById(theComment.getId()).isPresent());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void update() throws Exception {
        Comment theComment = commentDAO.save(comment);
        Assert.assertTrue(commentDAO.findById(theComment.getId()).isPresent());
        String newValue = "newContent";

        theComment.setContent(newValue);
        theComment = commentDAO.save(theComment);
        Assert.assertEquals(newValue, (commentDAO.findById(theComment.getId()).get().getContent()));
    }
}