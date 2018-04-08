package com.iivanovs.bookshopca.dao;

import com.iivanovs.bookshopca.entity.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentDAO extends CrudRepository<Comment, Long> {
}
