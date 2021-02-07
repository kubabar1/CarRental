package com.carrental.repository;

import com.carrental.model.entity.Comment;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Repository
public class CommentRepositoryImpl implements CommentRepositoryCustom {

  @PersistenceContext private EntityManager entityManager;

  @Override
  @Transactional
  public void addComment(Comment comment) {
    entityManager.persist(comment);
  }
}
