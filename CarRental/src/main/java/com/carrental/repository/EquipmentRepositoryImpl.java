package com.carrental.repository;

import java.util.ArrayList;
import java.util.List;

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
	
	@Override
	@Transactional
	public List<Equipment> getUnexistingDistinctEquipmentListForVehicle(Long id) {
		Vehicle vehicle = null;
		List<Equipment> newEqList = null; 

		try {
			vehicle = vehicleRepository.getVehicleUsingId(id);
			List<Equipment> eqList = null;
			
			if(vehicle!=null) {
				eqList = vehicle.getEquipmentList();
			}
		
			if(eqList==null) {
				newEqList  = entityManager.createQuery("SELECT e FROM Equipment e").getResultList();
			}else {
				List<String> eqCodesList = new ArrayList<>();
				for(int i=0;i<eqList.size();i++) {
					System.out.println(eqList.get(i).getEquipmentCode());
					eqCodesList.add(eqList.get(i).getEquipmentCode());
				}
				
				newEqList  = entityManager.createQuery("SELECT e FROM Equipment e WHERE e.equipmentCode NOT IN (:vehicleEquipment)")
						.setParameter("vehicleEquipment", eqCodesList).getResultList();
			}
		}catch(NoResultException e) {

		}
		
		return newEqList;
	}

}
