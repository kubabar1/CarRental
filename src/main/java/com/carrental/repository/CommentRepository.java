package com.carrental.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.model.Comment;
import com.carrental.model.Equipment;

public interface CommentRepository extends JpaRepository<Equipment, Long>, CommentRepositoryCustom {

	@Query(value="SELECT c FROM Comment c WHERE c.vehicleId=:vehicleId ORDER BY c.creationDate DESC",
			countQuery="SELECT COUNT(c) FROM Comment c WHERE c.vehicleId=:vehicleId")
	public Page<Comment> getCommentsForVehicle(@Param("vehicleId") Long vehicleId, Pageable pageable);
	
	@Query(value="SELECT c FROM Comment c WHERE c.vehicleId=:vehicleId ORDER BY c.creationDate DESC")
	public List<Comment> getAllForVehicle(@Param("vehicleId") Long vehicleId);
	
}
