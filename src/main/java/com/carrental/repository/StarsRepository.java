package com.carrental.repository;

import com.carrental.model.Stars;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StarsRepository extends JpaRepository<Stars, Long>, StarsRepositoryCustom {

  @Query("SELECT s FROM Stars s WHERE s.vehicleId=:vehicleId")
  public List<Stars> getStarsByVehicleId(@Param("vehicleId") Long vehicleId);

  @Query("SELECT AVG(s.stars) FROM Stars s WHERE s.vehicleId=:vehicleId")
  public Double getAvgStarsByVehicleId(@Param("vehicleId") Long vehicleId);
}
