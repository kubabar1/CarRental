package com.carrental.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.carrental.model.Comment;
import com.carrental.model.Stars;

@Repository
public class StarsRepositoryImpl implements StarsRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private StarsRepository starsRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Override
	@Transactional
	public void setStars(Long carId) {

		Stars oldStars = starsRepository.getStarsByVehicleId(carId);
		
		List<Comment> commentListForVehicle = commentRepository.getAllForVehicle(carId);
		
		int nb = commentListForVehicle.size();
		
		int starsSum = 0;
		
		for(int i=0;i<nb;i++) {
			starsSum += commentListForVehicle.get(i).getRating();
		}
		
		double starsAvg = starsSum/nb;
		Stars newStars = new Stars(carId, starsAvg);
		System.out.println(newStars.toString());

		if (oldStars == null) {
			entityManager.persist(newStars);
		} else {
			entityManager.merge(newStars);
		}

	}
}
