package com.carrental.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.carrental.model.Location;

public interface LocationRepository extends PagingAndSortingRepository<Location, Long> {

	public Location getLocationById(Long id);

	@Query("SELECT l FROM Location l")
	public List<Location> getLocationList();
	
	@Query(value = "SELECT l FROM Location l", countQuery = "SELECT COUNT(l) FROM Location l")
	public Page<Location> getLocationListForPage(Pageable pageable);

}