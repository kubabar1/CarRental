package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.entity.EquipmentEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface EquipmentRepository extends PagingAndSortingRepository<EquipmentEntity, String> {

    Set<EquipmentEntity> findAll();


    @Query("SELECT e FROM equipment e WHERE e.equipmentCode NOT IN (" +
                "SELECT ve.equipmentCode FROM vehicles v " +
                    "JOIN v.equipments ve " +
//                    "ON (eqp.vehicle_id = v.id) " +
                    "WHERE v.id=:vehicleId" +
            ")")
    Set<EquipmentEntity> getAllEquipmentsNotAssignedToVehicle(@Param("vehicleId") Long vehicleId);
}
