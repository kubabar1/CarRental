package com.carrental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.model.JobPosition;
import com.carrental.model.User;

public interface JobPositionRepository extends JpaRepository<JobPosition, Long>, JobPositionRepositoryCustom {

	@Query("select j from JobPosition j")
	public List<JobPosition> getAllJobPositions();

	public JobPosition getJobPositionById(Long id);

}
