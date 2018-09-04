package com.carrental.repository;

import java.math.BigDecimal;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.hibernate.Hibernate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.carrental.dto.VehicleFilterDto;
import com.carrental.model.Vehicle;

@Repository
public class VehicleRepositoryImpl implements VehicleRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	/*
	 * @Override
	 * 
	 * @Transactional public Page<Vehicle> getAllVehicles(Pageable pageable) {
	 * 
	 * int pageSize = pageable.getPageSize(); int numberOfFirstElement =
	 * (pageable.getPageNumber() - 1) * pageSize;
	 * 
	 * System.out.println("pageSize="+pageSize);
	 * System.out.println("pageNumber="+pageable.getPageNumber());
	 * System.out.println("numberOfFirstElement="+numberOfFirstElement);
	 * 
	 * List<Vehicle> vehicleList = (List<Vehicle>) entityManager
	 * .createQuery("SELECT v FROM Vehicle v ORDER BY v.id DESC") .getResultList();
	 * 
	 * for (int i = 0; i < vehicleList.size(); i++) {
	 * Hibernate.initialize(vehicleList.get(i).getEquipmentList()); }
	 * 
	 * final Page<Vehicle> page = new PageImpl<>(vehicleList, pageable,
	 * vehicleList.size());
	 * 
	 * 
	 * return page; }
	 */

	/*
	 * @Override
	 * 
	 * @Transactional public List<Vehicle> getCarList(int page, int nb) {
	 * 
	 * int idk = ((page - 1) * nb);
	 * 
	 * List<Vehicle> vehicleList = (List<Vehicle>) entityManager
	 * .createQuery("SELECT v FROM Vehicle v ORDER BY v.id DESC").setFirstResult(idk
	 * ).setMaxResults(nb) .getResultList();
	 * 
	 * for (int i = 0; i < vehicleList.size(); i++) {
	 * Hibernate.initialize(vehicleList.get(i).getEquipmentList()); }
	 * 
	 * return vehicleList; }
	 */

	/*@Override
	@Transactional
	public Page<Vehicle> getBestOfferCars(Pageable pageable) {

		int pageSize = pageable.getPageSize();
		int numberOfFirstElement = (pageable.getPageNumber()) * pageSize;

		if (pageable.getPageSize() < 0 || pageable.getPageNumber() < 0) {
			throw new IllegalArgumentException();
		}

		List<Vehicle> vehicleList = (List<Vehicle>) entityManager
				.createQuery("SELECT v FROM Vehicle v WHERE v.bestOffer = 1 ORDER BY v.id DESC")
				.setFirstResult(numberOfFirstElement).setMaxResults(pageSize).getResultList();

		long elementNumber = (long) entityManager
				.createQuery("SELECT COUNT(v) FROM Vehicle v WHERE v.bestOffer = 1 ORDER BY v.id DESC")
				.getSingleResult();

		for (int i = 0; i < vehicleList.size(); i++) {
			Hibernate.initialize(vehicleList.get(i).getEquipmentList());
		}

		Page<Vehicle> page = new PageImpl<>(vehicleList, pageable, elementNumber);

		return page;
	}*/

	@Override
	@Transactional
	public Vehicle getVehicleUsingId(Long id) {

		Vehicle vehicle = (Vehicle) entityManager.createQuery("SELECT v FROM Vehicle v WHERE v.id = :vehicle_id")
				.setParameter("vehicle_id", id).getSingleResult();

		Hibernate.initialize(vehicle.getEquipmentList());

		return vehicle;
	}

	@Override
	@Transactional
	public Page<Vehicle> getFiltredCarListForPage(VehicleFilterDto vehicleFilter, Pageable pageable) {
		java.sql.Date productionYearFrom = null;
		java.sql.Date productionYearTo = null;

		System.out.println(vehicleFilter.toString());

		SimpleDateFormat format = new SimpleDateFormat("yyyy");
		if (vehicleFilter.getProductionYearFrom() != null) {
			try {
				java.util.Date parsed1 = format.parse(vehicleFilter.getProductionYearFrom().toString());
				productionYearFrom = new java.sql.Date(parsed1.getTime());
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}

		if (vehicleFilter.getProductionYearTo() != null) {
			try {
				java.util.Date parsed2 = format.parse(vehicleFilter.getProductionYearTo().toString());
				productionYearTo = new java.sql.Date(parsed2.getTime());
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		
		int pageSize = pageable.getPageSize();
		int numberOfFirstElement = (pageable.getPageNumber()) * pageSize;

		if (pageable.getPageSize() < 0 || pageable.getPageNumber() < 0) {
			throw new IllegalArgumentException();
		}

		List<Vehicle> vehicleList = (List<Vehicle>) entityManager.createQuery(
				"SELECT v FROM Vehicle v JOIN VehicleParameters vp ON (v.id=vp.vehicleID) JOIN Location l ON (l.id=v.locationId) WHERE "
						+ "(:brand IS NULL OR v.brand=:brand) AND " + "(:model IS NULL OR v.model=:model) AND "
						+ "(:city IS NULL OR l.city=:city) AND " + "(:bodytype IS NULL OR vp.bodytype=:bodytype) AND "
						+ "((:priceFrom IS NULL OR v.dailyFee > :priceFrom) AND (:priceTo IS NULL OR v.dailyFee < :priceTo)) AND "
						+ "((:placesNumberFrom IS NULL OR vp.seatsNumber > :placesNumberFrom) AND (:placesNumberTo IS NULL OR vp.seatsNumber < :placesNumberTo)) AND "
						+ "((:doorsNumberFrom IS NULL OR vp.doorsNumber > :doorsNumberFrom) AND (:doorsNumberTo IS NULL OR vp.doorsNumber < :doorsNumberTo)) AND "
						+ "((:productionYearFrom IS NULL OR vp.productionYear > :productionYearFrom) AND (:productionYearTo IS NULL OR vp.productionYear < :productionYearTo)) AND "
						+ "(:color IS NULL OR vp.color=:color) " + " ORDER BY v.id ")
				.setParameter("brand", vehicleFilter.getBrand()).setParameter("model", vehicleFilter.getModel())
				.setParameter("city", vehicleFilter.getCity()).setParameter("bodytype", vehicleFilter.getBodytype())
				.setParameter("priceFrom", vehicleFilter.getPriceFrom())
				.setParameter("priceTo", vehicleFilter.getPriceTo())
				.setParameter("placesNumberFrom", vehicleFilter.getPlacesNumberFrom())
				.setParameter("placesNumberTo", vehicleFilter.getPlacesNumberTo())
				.setParameter("doorsNumberFrom", vehicleFilter.getDoorsNumberFrom())
				.setParameter("doorsNumberTo", vehicleFilter.getDoorsNumberTo())
				.setParameter("productionYearFrom", productionYearFrom)
				.setParameter("productionYearTo", productionYearTo).setParameter("color", vehicleFilter.getColor())
				.setFirstResult(numberOfFirstElement).setMaxResults(pageSize).getResultList();
		
		long elementNumber = (long) entityManager.createQuery(
				"SELECT COUNT(v) FROM Vehicle v JOIN VehicleParameters vp ON (v.id=vp.vehicleID) JOIN Location l ON (l.id=v.locationId) WHERE "
						+ "(:brand IS NULL OR v.brand=:brand) AND " + "(:model IS NULL OR v.model=:model) AND "
						+ "(:city IS NULL OR l.city=:city) AND " + "(:bodytype IS NULL OR vp.bodytype=:bodytype) AND "
						+ "((:priceFrom IS NULL OR v.dailyFee > :priceFrom) AND (:priceTo IS NULL OR v.dailyFee < :priceTo)) AND "
						+ "((:placesNumberFrom IS NULL OR vp.seatsNumber > :placesNumberFrom) AND (:placesNumberTo IS NULL OR vp.seatsNumber < :placesNumberTo)) AND "
						+ "((:doorsNumberFrom IS NULL OR vp.doorsNumber > :doorsNumberFrom) AND (:doorsNumberTo IS NULL OR vp.doorsNumber < :doorsNumberTo)) AND "
						+ "((:productionYearFrom IS NULL OR vp.productionYear > :productionYearFrom) AND (:productionYearTo IS NULL OR vp.productionYear < :productionYearTo)) AND "
						+ "(:color IS NULL OR vp.color=:color) " + " ORDER BY v.id DESC ")
				.setParameter("brand", vehicleFilter.getBrand()).setParameter("model", vehicleFilter.getModel())
				.setParameter("city", vehicleFilter.getCity()).setParameter("bodytype", vehicleFilter.getBodytype())
				.setParameter("priceFrom", vehicleFilter.getPriceFrom())
				.setParameter("priceTo", vehicleFilter.getPriceTo())
				.setParameter("placesNumberFrom", vehicleFilter.getPlacesNumberFrom())
				.setParameter("placesNumberTo", vehicleFilter.getPlacesNumberTo())
				.setParameter("doorsNumberFrom", vehicleFilter.getDoorsNumberFrom())
				.setParameter("doorsNumberTo", vehicleFilter.getDoorsNumberTo())
				.setParameter("productionYearFrom", productionYearFrom)
				.setParameter("productionYearTo", productionYearTo).setParameter("color", vehicleFilter.getColor())
				.getSingleResult();

		for (int i = 0; i < vehicleList.size(); i++) {
			Hibernate.initialize(vehicleList.get(i).getEquipmentList());
		}

		
		Page<Vehicle> page = new PageImpl<>(vehicleList, pageable, elementNumber);

		return page;
	}

	@Override
	public List<String> getBrandList() {
		return (List<String>) entityManager.createQuery("SELECT distinct v.brand FROM Vehicle v").getResultList();
	}

	@Override
	public List<String> getModelListForBrand(String brand) {

		String formatedBrand = String.format("%s", brand.replace("\"", ""));

		System.out.println(formatedBrand);

		return (List<String>) entityManager.createQuery("SELECT distinct v.model FROM Vehicle v WHERE v.brand=:br")
				.setParameter("br", formatedBrand).getResultList();
	}

	@Override
	public List<String> getBodTypeList() {
		return (List<String>) entityManager
				.createQuery(
						"SELECT distinct vp.bodytype FROM Vehicle v JOIN VehicleParameters vp ON (v.id=vp.vehicleID)")
				.getResultList();
	}

	@Override
	public List<String> getCityList() {
		return (List<String>) entityManager.createQuery("SELECT l.city FROM Location l").getResultList();
	}

	@Override
	public List<String> getColorList() {
		return (List<String>) entityManager
				.createQuery("SELECT distinct vp.color FROM Vehicle v JOIN VehicleParameters vp ON (v.id=vp.vehicleID)")
				.getResultList();
	}

	@Override
	public List<Vehicle> getVehicleListForCity(String city) {
		System.out.println(city);
		
		return (List<Vehicle>) entityManager
				.createQuery("SELECT DISTINCT v FROM Vehicle v JOIN Location l ON(v.locationId=l.id) LEFT JOIN FETCH v.equipmentList  WHERE l.city=:ct")
				.setParameter("ct", city)
				.getResultList();
	}
}
