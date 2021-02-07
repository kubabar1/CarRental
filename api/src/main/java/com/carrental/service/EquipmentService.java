package com.carrental.service;

import com.carrental.model.entity.Equipment;

import java.util.List;

public interface EquipmentService {

  public List<Equipment> getEquipmentList();

  public List<Equipment> getUnexistingDistinctEquipmentListForVehicle(Long id);

  public void addEquipment(Equipment equipment);

  public void deleteEquipmentById(String eqpCode);

  public Equipment getEquipmentByCode(String equipmentCode);
}
