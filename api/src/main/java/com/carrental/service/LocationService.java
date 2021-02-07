package com.carrental.service;

import com.carrental.model.entity.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LocationService {

  public Location getLocationById(Long id);

  public List<Location> getLocationList();

  public Page<Location> getLocationListForPage(Pageable pageable);
}
