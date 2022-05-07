package com.carrental.ratingservice.service;

import com.carrental.ratingservice.model.dto.CommentAddDTO;
import com.carrental.ratingservice.model.dto.CommentResponseDTO;

import java.util.NoSuchElementException;
import java.util.Set;

public interface CommentService {

    Set<CommentResponseDTO> getComments();

    Set<CommentResponseDTO> getCommentsByUserId(Long userId) throws NoSuchElementException;

    Set<CommentResponseDTO> getCommentsByVehicleId(Long vehicleId) throws NoSuchElementException;

    CommentResponseDTO addComment(CommentAddDTO commentAddDTO);
}
