package com.carrental.repository;

import com.carrental.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EquipmentRepository
    extends JpaRepository<Equipment, Long>, EquipmentRepositoryCustom {

  @Query("SELECT e FROM Equipment e")
  public List<Equipment> getEquipmentList();

  @Query("SELECT e FROM Equipment e WHERE e.equipmentCode=:equipmentCode")
  public Equipment getEquipmentByCode(@Param("equipmentCode") String equipmentCode);
}
