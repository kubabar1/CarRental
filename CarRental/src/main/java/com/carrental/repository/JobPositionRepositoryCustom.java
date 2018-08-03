package com.carrental.repository;

import java.util.List;

import com.carrental.model.JobPosition;

public interface JobPositionRepositoryCustom {

	public List<JobPosition> getJobPositionListForPage(int page, int nb);

}
