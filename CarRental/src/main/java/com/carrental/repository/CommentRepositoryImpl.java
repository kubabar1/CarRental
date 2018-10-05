package com.carrental.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.carrental.model.Comment;
import com.carrental.model.Vehicle;

@Repository
public class CommentRepositoryImpl implements CommentRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	@Transactional
	public void addComment(Comment comment) {
		entityManager.persist(comment);
	}

}
