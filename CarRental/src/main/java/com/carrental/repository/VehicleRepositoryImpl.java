package com.carrental.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.carrental.model.Vehicle;

@Repository
public class VehicleRepositoryImpl implements VehicleRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<Vehicle> getCarListForPage(int page, int nb) {

		int idk = ((page - 1) * nb);

		return (List<Vehicle>) entityManager.createQuery("SELECT v FROM Vehicle v ORDER BY v.id DESC")
				.setFirstResult(idk).setMaxResults(nb).getResultList();
	}

	@Override
	public List<Vehicle> getBestOfferCars(int page, int nb) {

		int idk = ((page - 1) * nb);

		return (List<Vehicle>) entityManager
				.createQuery("SELECT v FROM Vehicle v WHERE v.bestOffer = 1 ORDER BY v.id DESC").setFirstResult(idk)
				.setMaxResults(nb).getResultList();
	}
}
