package com.carrental.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.carrental.model.Equipment;
import com.carrental.model.Vehicle;

@Repository
public class EquipmentRepositoryImpl implements EquipmentRepositoryCustom{


	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private VehicleRepository vehicleRepository;
	
	@Autowired
	private EquipmentRepository equipmentRepository;
	
	@Override
	@Transactional
	public List<Equipment> getUnexistingDistinctEquipmentListForVehicle(Long id) {
		Vehicle vehicle = null;
		List<Equipment> newEqList = null; 

		System.out.println(1);
		
		try {
			System.out.println(2);
			vehicle = vehicleRepository.getVehicleUsingId(id);
			List<Equipment> eqSet = null;
			
			if(vehicle!=null) {
				System.out.println(2);
				eqSet = vehicle.getEquipmentList();
				System.out.println(eqSet);
				System.out.println(eqSet.toString());
			}
		
			if(eqSet==null || eqSet.isEmpty()) {
				System.out.println(3);
				newEqList  = entityManager.createQuery("SELECT e FROM Equipment e").getResultList();
			}else {
				System.out.println(4);
				List<String> eqCodesList = new ArrayList<>();
				for(Equipment e : eqSet) {
					System.out.println(5);
					System.out.println(e.getEquipmentCode());
					eqCodesList.add(e.getEquipmentCode());
				}
				System.out.println(6);
				
				newEqList  = entityManager.createQuery("SELECT e FROM Equipment e WHERE e.equipmentCode NOT IN :vehicleEquipment")
						.setParameter("vehicleEquipment", eqCodesList).getResultList();
			}
		}catch(NoResultException e) {
			System.out.println(7);

		}
		System.out.println(8);
		
		return newEqList;
	}

	@Override
	@Transactional
	public void addEquipment(Equipment equipment) {

		entityManager.persist(equipment);
		
	}

	@Override
	@Transactional
	public void deleteEquipmentById(String eqpCode) {
		
		Equipment eq = equipmentRepository.getEquipmentByCode(eqpCode);
		
		entityManager.remove(eq);
		
	}

}
