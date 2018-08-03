package com.carrental.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.carrental.model.User;
import com.carrental.model.Vehicle;

@Repository
public class UserRepositoryImpl implements UserRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<User> getUserListForPage(int page, int nb) {
		int idk = ((page - 1) * nb);

		return (List<User>) entityManager.createQuery("SELECT u FROM User u ORDER BY u.id ASC").setFirstResult(idk)
				.setMaxResults(nb).getResultList();
	}

}
