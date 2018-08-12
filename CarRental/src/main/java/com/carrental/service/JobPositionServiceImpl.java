package com.carrental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.model.JobPosition;
import com.carrental.model.User;
import com.carrental.repository.JobPositionRepository;

@Service("jobPositionService")
@Transactional
public class JobPositionServiceImpl implements JobPositionService {

	@Autowired
	private JobPositionRepository jobPositionRepository;

	@Override
	public List<JobPosition> getAllJobPositions() {
		return jobPositionRepository.getAllJobPositions();
	}

	@Override
	public JobPosition getJobPositionById(Long id) {
		return jobPositionRepository.getJobPositionById(id);
	}

	@Override
	public List<JobPosition> getJobPositionListForPage(int page, int nb) {
		return jobPositionRepository.getJobPositionListForPage(page, nb);
	}

}
