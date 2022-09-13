package com.carrental.ratingservice.service;

import com.carrental.ratingservice.model.dto.CommentWithRateAddDTO;
import com.carrental.ratingservice.model.dto.CommentWithRateResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.NoSuchElementException;
import java.util.Set;

public interface CommentService {

    Set<CommentWithRateResponseDTO> getComments();

    Set<CommentWithRateResponseDTO> getCommentsByUserId(Long userId) throws NoSuchElementException;

    Page<CommentWithRateResponseDTO> getCommentsByVehicleId(Long vehicleId, Pageable pageable) throws NoSuchElementException;

    CommentWithRateResponseDTO addCommentWithRate(CommentWithRateAddDTO commentWithRateAddDTO);
}
