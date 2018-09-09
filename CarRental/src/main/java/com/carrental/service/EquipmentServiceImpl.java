package com.carrental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.model.Equipment;
import com.carrental.repository.EquipmentRepository;

@Service("equipmentService")
@Transactional
public class EquipmentServiceImpl implements EquipmentService{

	@Autowired
	private EquipmentRepository equipmentRepository;
	
	@Override
	public List<Equipment> getEquipmentList() {
		return equipmentRepository.getEquipmentList();
	}

	@Override
	public List<Equipment> getUnexistingDistinctEquipmentListForVehicle(Long id) {
		return equipmentRepository.getUnexistingDistinctEquipmentListForVehicle(id);
	}

}
