package com.carrental.repository;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.hibernate.Hibernate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.carrental.dto.VehicleAddDto;
import com.carrental.dto.VehicleFilterDto;
import com.carrental.model.User;
import com.carrental.model.Vehicle;
import com.carrental.model.VehicleParameters;

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

	/*
	 * @Override
	 * 
	 * @Transactional public Page<Vehicle> getBestOfferCars(Pageable pageable) {
	 * 
	 * int pageSize = pageable.getPageSize(); int numberOfFirstElement =
	 * (pageable.getPageNumber()) * pageSize;
	 * 
	 * if (pageable.getPageSize() < 0 || pageable.getPageNumber() < 0) { throw new
	 * IllegalArgumentException(); }
	 * 
	 * List<Vehicle> vehicleList = (List<Vehicle>) entityManager
	 * .createQuery("SELECT v FROM Vehicle v WHERE v.bestOffer = 1 ORDER BY v.id DESC"
	 * )
	 * .setFirstResult(numberOfFirstElement).setMaxResults(pageSize).getResultList()
	 * ;
	 * 
	 * long elementNumber = (long) entityManager
	 * .createQuery("SELECT COUNT(v) FROM Vehicle v WHERE v.bestOffer = 1 ORDER BY v.id DESC"
	 * ) .getSingleResult();
	 * 
	 * for (int i = 0; i < vehicleList.size(); i++) {
	 * Hibernate.initialize(vehicleList.get(i).getEquipmentList()); }
	 * 
	 * Page<Vehicle> page = new PageImpl<>(vehicleList, pageable, elementNumber);
	 * 
	 * return page; }
	 */

	@Override
	@Transactional
	public Vehicle getVehicleUsingId(Long id) {

		Vehicle vehicle = null;

		try {
			vehicle = (Vehicle) entityManager.createQuery("SELECT v FROM Vehicle v WHERE v.id = :vehicle_id")
					.setParameter("vehicle_id", id).getSingleResult();

			Hibernate.initialize(vehicle.getEquipmentList());
		} catch (NoResultException e) {

		}

		return vehicle;
	}

	@Override
	@Transactional
	public Page<Vehicle> getFiltredCarListForPage(VehicleFilterDto vehicleFilter, Pageable pageable) {
		java.sql.Date productionYearFrom = null;
		java.sql.Date productionYearTo = null;

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

		return (List<Vehicle>) entityManager.createQuery(
				"SELECT DISTINCT v FROM Vehicle v JOIN Location l ON(v.locationId=l.id) LEFT JOIN FETCH v.equipmentList  WHERE l.city=:ct")
				.setParameter("ct", city).getResultList();
	}

	@Override
	@Transactional
	public int updateVehicle(VehicleAddDto vehicleAddDto) {

		int number = entityManager
				.createQuery("UPDATE Vehicle v SET " + "v.brand=COALESCE(:brand,v.brand), "
						+ "v.model=COALESCE(:model,v.model), " + "v.dailyFee=COALESCE(:dailyFee,v.dailyFee), "
						+ "v.registration=COALESCE(:registration,v.registration), "
						+ "v.locationId=COALESCE(:locationId,v.locationId), "
						+ "v.vehicleStatus=COALESCE(:vehicleStatus,v.vehicleStatus), "
						+ "v.bestOffer=COALESCE(:bestOffer,v.bestOffer) " + "WHERE v.id=:id")
				.setParameter("brand", vehicleAddDto.getBrand()).setParameter("model", vehicleAddDto.getModel())
				.setParameter("dailyFee", vehicleAddDto.getDailyFee())
				.setParameter("registration", vehicleAddDto.getRegistration())
				.setParameter("locationId", vehicleAddDto.getLocation())
				.setParameter("vehicleStatus", vehicleAddDto.getVehicleStatus())
				.setParameter("bestOffer", vehicleAddDto.getBestOffer()).setParameter("id", vehicleAddDto.getId())
				.executeUpdate();

		entityManager
				.createQuery("UPDATE VehicleParameters vp SET " + "vp.bodytype=COALESCE(:bodytype,vp.bodytype), "
						+ "vp.fuelType=COALESCE(:fuelType,vp.fuelType), " + "vp.power=COALESCE(:power,vp.power), "
						+ "vp.gearbox=COALESCE(:gearbox,vp.gearbox), "
						+ "vp.frontWheelDrive=COALESCE(:frontWheelDrive,vp.frontWheelDrive), "
						+ "vp.doorsNumber=COALESCE(:doorsNumber,vp.doorsNumber), "
						+ "vp.seatsNumber=COALESCE(:seatsNumber,vp.seatsNumber), "
						+ "vp.color=COALESCE(:color,vp.color), " + "vp.metallic=COALESCE(:metallic,vp.metallic), "
						+ "vp.description=COALESCE(:description,vp.description), "
						+ "vp.productionYear=COALESCE(:productionYear,vp.productionYear), "
						+ "vp.photoName=COALESCE(:photoName,vp.photoName) " + "WHERE vp.vehicleID=:id")
				.setParameter("bodytype", vehicleAddDto.getBodytype())
				.setParameter("fuelType", vehicleAddDto.getFuelType()).setParameter("power", vehicleAddDto.getPower())
				.setParameter("gearbox", vehicleAddDto.getGearbox())
				.setParameter("frontWheelDrive", vehicleAddDto.getFrontWheelDrive())
				.setParameter("doorsNumber", vehicleAddDto.getDoorsNumber())
				.setParameter("seatsNumber", vehicleAddDto.getSeatsNumber())
				.setParameter("color", vehicleAddDto.getColor()).setParameter("metallic", vehicleAddDto.getMetallic())
				.setParameter("description", vehicleAddDto.getDescription())
				.setParameter("productionYear", vehicleAddDto.getProductionYear())
				.setParameter("photoName", vehicleAddDto.getFileName()).setParameter("id", vehicleAddDto.getId())
				.executeUpdate();

		return number;
	}

	@Override
	@Transactional
	public void addVehicle(VehicleAddDto vehicleAddDto) {
		Vehicle vehicle = new Vehicle(vehicleAddDto.getRegistration(), vehicleAddDto.getBrand(),
				vehicleAddDto.getModel(), vehicleAddDto.getDailyFee(), vehicleAddDto.getLocation(),
				vehicleAddDto.getVehicleStatus(), (vehicleAddDto.getBestOffer() != 0 ? true : false));

		entityManager.persist(vehicle);

		entityManager.flush();
		Long vehicleId = vehicle.getId();

		VehicleParameters vehicleParameters = null;

		Integer value = vehicleAddDto.getProductionYear();
		SimpleDateFormat originalFormat = new SimpleDateFormat("yyyy");
		Date productionYear = null;

		try {
			productionYear = originalFormat.parse(value.toString());
			java.sql.Date sqlDate = new java.sql.Date(productionYear.getTime());

			vehicleParameters = new VehicleParameters(vehicleId, vehicleAddDto.getBodytype(), sqlDate,
					vehicleAddDto.getFuelType(), vehicleAddDto.getPower(), vehicleAddDto.getGearbox(),
					vehicleAddDto.getFrontWheelDrive(), vehicleAddDto.getDoorsNumber(), vehicleAddDto.getSeatsNumber(),
					vehicleAddDto.getColor(), vehicleAddDto.getMetallic(), vehicleAddDto.getFileName(),
					vehicleAddDto.getDescription());

			System.out.println(sqlDate.toString());
		} catch (ParseException e) {
			e.printStackTrace();
		}

		entityManager.persist(vehicleParameters);

	}
}
