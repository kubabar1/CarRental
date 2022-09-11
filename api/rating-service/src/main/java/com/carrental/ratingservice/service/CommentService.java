package com.carrental.ratingservice.service;

import com.carrental.ratingservice.model.dto.CommentAddDTO;
import com.carrental.ratingservice.model.dto.CommentResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.NoSuchElementException;
import java.util.Set;

public interface CommentService {

    Set<CommentResponseDTO> getComments();

    Set<CommentResponseDTO> getCommentsByUserId(Long userId) throws NoSuchElementException;

    Page<CommentResponseDTO> getCommentsByVehicleId(Long vehicleId, Pageable pageable) throws NoSuchElementException;

    CommentResponseDTO addComment(CommentAddDTO commentAddDTO);
}
