package com.carrental.service;

import java.util.List;

import com.carrental.model.JobPosition;
import com.carrental.model.User;

public interface JobPositionService {
	
	public List<JobPosition> getAllJobPositions();

	public JobPosition getJobPositionById(Long id);

	public List<JobPosition> getJobPositionListForPage(int page, int nb);

}
