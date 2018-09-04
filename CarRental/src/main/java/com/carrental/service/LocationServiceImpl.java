package com.carrental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.model.Location;
import com.carrental.repository.LocationRepository;

@Service("locationServiceImpl")
@Transactional
public class LocationServiceImpl implements LocationService {

	@Autowired
	private LocationRepository locationRepository;

	@Override
	public Location getLocationById(Long id) {
		return locationRepository.getLocationById(id);
	}

}
