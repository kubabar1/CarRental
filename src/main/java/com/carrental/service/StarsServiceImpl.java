package com.carrental.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carrental.model.Stars;
import com.carrental.repository.StarsRepository;

@Service("starsService")
@Transactional
public class StarsServiceImpl implements StarsService {

	@Autowired
	private StarsRepository starsRepository;

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
