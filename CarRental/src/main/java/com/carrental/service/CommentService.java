package com.carrental.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import com.carrental.model.Comment;

public interface CommentService {
	
	public Page<Comment> getCommentsForVehicle(@Param("vehicleId") Long vehicleId, Pageable pageable);

	public void addComment(Comment comment, Long vehicleId);
	
}
