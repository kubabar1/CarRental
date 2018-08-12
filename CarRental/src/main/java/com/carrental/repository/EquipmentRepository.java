package com.carrental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.model.Equipment;
import com.carrental.model.User;

public interface EquipmentRepository extends JpaRepository<Equipment, Long>, EquipmentRepositoryCustom {

}
