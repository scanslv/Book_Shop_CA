package com.iivanovs.bookshopca.Interface;

import com.iivanovs.bookshopca.entity.Book;
import com.iivanovs.bookshopca.entity.Comment;

public interface CommentService {
    public Book create(long user_id, long book_id, Comment comment);
}
