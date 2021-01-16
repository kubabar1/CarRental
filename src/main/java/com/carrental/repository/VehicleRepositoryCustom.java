package com.carrental.repository;

import com.carrental.model.dto.VehicleAddDto;
import com.carrental.model.dto.VehicleFilterDto;
import com.carrental.model.entity.Equipment;
import com.carrental.model.entity.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VehicleRepositoryCustom {

  public Vehicle getVehicleUsingId(Long id);

  public Page<Vehicle> getFiltredCarListForPage(VehicleFilterDto vehicleFilter, Pageable pageable);

  public List<Vehicle> getAvailableVehicleListForLocation(Long cityId);

  public List<String> getBrandList();

  public List<String> getModelListForBrand(String brand);

  public List<String> getBodTypeList();

  public List<String> getCityList();

  public List<String> getColorList();

  public int updateVehicle(VehicleAddDto vehicleAddDto);

  public void addVehicle(VehicleAddDto vehicleAddDto);

  public void addEquipment(Equipment equipment, Long vehicleId);

  public void removeEquipment(String eqpCode, Long vehicleId);
}
