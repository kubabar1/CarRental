package com.carrental.repository;

import com.carrental.model.entity.Equipment;

import java.util.List;

public interface EquipmentRepositoryCustom {

  public List<Equipment> getUnexistingDistinctEquipmentListForVehicle(Long id);

  public void addEquipment(Equipment equipment);

  public void deleteEquipmentById(String eqpCode);
}
