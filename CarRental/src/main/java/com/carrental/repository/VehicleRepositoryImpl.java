package com.carrental.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Repository;

import com.carrental.model.Vehicle;

@Repository
public class VehicleRepositoryImpl implements VehicleRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	@Transactional
	public List<Vehicle> getCarListForPage(int page, int nb) {

		int idk = ((page - 1) * nb);

		List<Vehicle> vehicleList = (List<Vehicle>) entityManager
				.createQuery("SELECT v FROM Vehicle v ORDER BY v.id DESC").setFirstResult(idk).setMaxResults(nb)
				.getResultList();

		for (int i = 0; i < vehicleList.size(); i++) {
			Hibernate.initialize(vehicleList.get(i).getEquipmentList());
		}

		return vehicleList;
	}

	@Override
	@Transactional
	public List<Vehicle> getBestOfferCars(int page, int nb) {

		int idk = ((page - 1) * nb);

		List<Vehicle> vehicleList = (List<Vehicle>) entityManager
				.createQuery("SELECT v FROM Vehicle v WHERE v.bestOffer = 1 ORDER BY v.id DESC").setFirstResult(idk)
				.setMaxResults(nb).getResultList();

		for (int i = 0; i < vehicleList.size(); i++) {
			Hibernate.initialize(vehicleList.get(i).getEquipmentList());
		}

		return vehicleList;
	}

	@Override
	@Transactional
	public Vehicle getVehicleUsingId(Long id) {

		Vehicle vehicle = (Vehicle) entityManager.createQuery("SELECT v FROM Vehicle v WHERE v.id = :vehicle_id")
				.setParameter("vehicle_id", id).getSingleResult();

		Hibernate.initialize(vehicle.getEquipmentList());

		return vehicle;
	}
}
