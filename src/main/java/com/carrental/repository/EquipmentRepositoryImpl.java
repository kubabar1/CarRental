package com.carrental.repository;

import com.carrental.model.Equipment;
import com.carrental.model.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Repository
public class EquipmentRepositoryImpl implements EquipmentRepositoryCustom {

  @PersistenceContext private EntityManager entityManager;

  @Autowired private VehicleRepository vehicleRepository;

  @Autowired private EquipmentRepository equipmentRepository;

  @Override
  @Transactional
  public List<Equipment> getUnexistingDistinctEquipmentListForVehicle(Long id) {
    Vehicle vehicle = null;
    List<Equipment> newEqList = null;

    try {
      vehicle = vehicleRepository.getVehicleUsingId(id);
      List<Equipment> eqSet = null;

      if (vehicle != null) {
        eqSet = vehicle.getEquipmentList();
      }

      if (eqSet == null || eqSet.isEmpty()) {
        newEqList = entityManager.createQuery("SELECT e FROM Equipment e").getResultList();
      } else {
        List<String> eqCodesList = new ArrayList<>();
        for (Equipment e : eqSet) {
          eqCodesList.add(e.getEquipmentCode());
        }

        newEqList =
            entityManager
                .createQuery(
                    "SELECT e FROM Equipment e WHERE e.equipmentCode NOT IN :vehicleEquipment")
                .setParameter("vehicleEquipment", eqCodesList)
                .getResultList();
      }
    } catch (NoResultException e) {

    }

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
