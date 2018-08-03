package com.carrental.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.carrental.model.JobPosition;

@Repository
public class JobPositionRepositoryImpl implements JobPositionRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<JobPosition> getJobPositionListForPage(int page, int nb) {
		int idk = ((page - 1) * nb);

		return (List<JobPosition>) entityManager.createQuery("SELECT j FROM JobPosition j ORDER BY j.id ASC")
				.setFirstResult(idk).setMaxResults(nb).getResultList();
	}

}
