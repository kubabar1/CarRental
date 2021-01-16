package com.carrental.service;

import com.carrental.model.entity.Equipment;
import com.carrental.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("equipmentService")
@Transactional
public class EquipmentServiceImpl implements EquipmentService {

  @Autowired private EquipmentRepository equipmentRepository;

  @Override
  public List<Equipment> getEquipmentList() {
    return equipmentRepository.getEquipmentList();
  }

  @Override
  public List<Equipment> getUnexistingDistinctEquipmentListForVehicle(Long id) {
    return equipmentRepository.getUnexistingDistinctEquipmentListForVehicle(id);
  }

  @Override
  public void addEquipment(Equipment equipment) {
    equipmentRepository.addEquipment(equipment);
  }

  @Override
  public void deleteEquipmentById(String id) {
    equipmentRepository.deleteEquipmentById(id);
  }

  @Override
  public Equipment getEquipmentByCode(String equipmentCode) {
    return equipmentRepository.getEquipmentByCode(equipmentCode);
  }
}
