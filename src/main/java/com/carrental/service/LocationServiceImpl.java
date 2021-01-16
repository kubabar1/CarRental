package com.carrental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	
	@Override
	public List<Location> getLocationList(){
		return locationRepository.getLocationList();
	}

	@Override
	public Page<Location> getLocationListForPage(Pageable pageable) {
		return locationRepository.getLocationListForPage(pageable);
	}

}
