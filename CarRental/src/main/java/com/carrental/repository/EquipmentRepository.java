package com.carrental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.model.Equipment;
import com.carrental.model.User;

public interface EquipmentRepository extends JpaRepository<Equipment, Long>, EquipmentRepositoryCustom {

	@Query("SELECT e FROM Equipment e")
	public List<Equipment> getEquipmentList();

}
