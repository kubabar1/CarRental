package com.carrental.service;

import com.carrental.model.entity.Comment;
import com.carrental.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("commentService")
@Transactional
public class CommentServiceImpl implements CommentService {

  @Autowired CommentRepository commentRepository;

  @Override
  public Page<Comment> getCommentsForVehicle(
      @Param("vehicleId") Long vehicleId, Pageable pageable) {
    return commentRepository.getCommentsForVehicle(vehicleId, pageable);
  }

  @Override
  public void addComment(Comment comment) {
    commentRepository.addComment(comment);
  }

  @Override
  public List<Comment> getAllForVehicle(Long vehicleId) {
    return commentRepository.getAllForVehicle(vehicleId);
  }
}
