package com.carrental.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.model.Comment;
import com.carrental.model.Equipment;
import com.carrental.model.Stars;

public interface StarsRepository extends JpaRepository<Stars, Long>, StarsRepositoryCustom {

	@Query("SELECT s FROM Stars s WHERE s.vehicleId=:vehicleId")
	public List<Stars> getStarsByVehicleId(@Param("vehicleId") Long vehicleId);
	
	@Query("SELECT AVG(s.stars) FROM Stars s WHERE s.vehicleId=:vehicleId")
	public Double getAvgStarsByVehicleId(@Param("vehicleId") Long vehicleId);

}
