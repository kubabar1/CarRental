package com.carrental.service;

import com.carrental.model.dto.VehicleAddDTO;
import com.carrental.model.dto.VehicleFilterDTO;
import com.carrental.model.entity.Equipment;
import com.carrental.model.entity.Vehicle;
import com.carrental.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("vehicleService")
@Transactional
public class VehicleServiceImpl implements VehicleService {

  @Autowired private VehicleRepository vehicleRepository;

  @Override
  public Page<Vehicle> getBestOfferCars(Pageable pageable) {
    return vehicleRepository.getBestOfferCars(pageable);
  }

  @Override
  public Vehicle getVehicleById(Long id) {
    return vehicleRepository.getVehicleUsingId(id);
  }

  @Override
  public Page<Vehicle> getFiltredCarListForPage(VehicleFilterDTO vehicleFilter, Pageable pageable) {
    return vehicleRepository.getFiltredCarListForPage(vehicleFilter, pageable);
  }

  @Override
  public List<String> getBrandList() {
    return vehicleRepository.getBrandList();
  }

  @Override
  public List<String> getModelListForBrand(String brand) {
    return vehicleRepository.getModelListForBrand(brand);
  }

  @Override
  public List<String> getBodTypeList() {
    return vehicleRepository.getBodTypeList();
  }

  @Override
  public List<String> getCityList() {
    return vehicleRepository.getCityList();
  }

  @Override
  public List<String> getColorList() {
    return vehicleRepository.getColorList();
  }

  @Override
  public Page<Vehicle> getVehiclesForPage(Pageable pageable) {
    return vehicleRepository.getVehiclesForPage(pageable);
  }

  @Override
  public List<Vehicle> getAllVehicles() {
    return vehicleRepository.getAllVehicles();
  }

  @Override
  public List<Vehicle> getAvailableVehicleListForLocation(Long cityId) {
    return vehicleRepository.getAvailableVehicleListForLocation(cityId);
  }

  @Override
  public int updateVehicle(VehicleAddDTO vehicleAddDto) {
    return vehicleRepository.updateVehicle(vehicleAddDto);
  }

  @Override
  public void addVehicle(VehicleAddDTO vehicleAddDto) {
    vehicleRepository.addVehicle(vehicleAddDto);
  }

  @Override
  public void addEquipment(Equipment equipment, Long vehicleId) {
    vehicleRepository.addEquipment(equipment, vehicleId);
  }

  @Override
  public void removeEquipment(String eqpCode, Long vehicleId) {
    vehicleRepository.removeEquipment(eqpCode, vehicleId);
  }
}
