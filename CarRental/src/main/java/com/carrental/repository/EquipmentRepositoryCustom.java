package com.carrental.repository;

import java.util.List;

import com.carrental.model.Equipment;

public interface EquipmentRepositoryCustom {

	public List<Equipment> getUnexistingDistinctEquipmentListForVehicle(Long id);
	
}
