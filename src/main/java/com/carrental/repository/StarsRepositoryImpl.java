package com.carrental.repository;

import com.carrental.model.Stars;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Repository
public class StarsRepositoryImpl implements StarsRepositoryCustom {

  @PersistenceContext private EntityManager entityManager;

  @Override
  @Transactional
  public void addStars(Stars stars) {
    entityManager.persist(stars);
  }
}
