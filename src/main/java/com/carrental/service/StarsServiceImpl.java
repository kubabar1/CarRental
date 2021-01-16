package com.carrental.service;

import com.carrental.model.entity.Stars;
import com.carrental.repository.StarsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service("starsService")
@Transactional
public class StarsServiceImpl implements StarsService {

  @Autowired private StarsRepository starsRepository;

  @Override
  public void addStars(Stars stars) {
    starsRepository.addStars(stars);
  }

  @Override
  public List<Stars> getStarsByVehicleId(Long vehicleId) {
    return starsRepository.getStarsByVehicleId(vehicleId);
  }

  @Override
  public Double getAvgStarsByVehicleId(Long vehicleId) {
    return starsRepository.getAvgStarsByVehicleId(vehicleId);
  }
}
