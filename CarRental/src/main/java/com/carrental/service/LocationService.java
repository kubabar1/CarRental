package com.carrental.service;

import org.springframework.data.repository.query.Param;

import com.carrental.model.Location;

public interface LocationService {

	public Location getLocationById(Long id);

}
