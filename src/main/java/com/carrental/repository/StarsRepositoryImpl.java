package com.carrental.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.carrental.model.Comment;
import com.carrental.model.Stars;

@Repository
public class StarsRepositoryImpl implements StarsRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	@Transactional
	public void addStars(Stars stars) {
		entityManager.persist(stars);
	}
}
