package com.carrental.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carrental.repository.StarsRepository;

@Service("starsService")
@Transactional
public class StarsServiceImpl implements StarsService{
	
	@Autowired
	private StarsRepository starsRepository;

	@Override
	public void setStars(Long carId) {
		starsRepository.setStars(carId);
	}
	
}
