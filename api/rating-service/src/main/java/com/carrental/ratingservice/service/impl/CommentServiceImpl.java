package com.carrental.ratingservice.service.impl;

import com.carrental.ratingservice.model.dto.CommentAddDTO;
import com.carrental.ratingservice.model.dto.CommentResponseDTO;
import com.carrental.ratingservice.model.entity.CommentEntity;
import com.carrental.ratingservice.repository.CommentRepository;
import com.carrental.ratingservice.service.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public Set<CommentResponseDTO> getComments() {
        return commentRepository
                .findAll()
                .stream()
                .map(comment -> modelMapper.map(comment, CommentResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Set<CommentResponseDTO> getCommentsByUserId(Long userId) throws NoSuchElementException {
        return commentRepository
                .findCommentEntitiesByUserId(userId)
                .stream()
                .map(comment -> modelMapper.map(comment, CommentResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Set<CommentResponseDTO> getCommentsByVehicleId(Long vehicleId) throws NoSuchElementException {
        return commentRepository
                .findCommentEntitiesByVehicleId(vehicleId)
                .stream()
                .map(comment -> modelMapper.map(comment, CommentResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public CommentResponseDTO addComment(CommentAddDTO commentAddDTO) {
        CommentEntity commentEntity = modelMapper.map(commentAddDTO, CommentEntity.class);
        return modelMapper.map(commentRepository.save(commentEntity), CommentResponseDTO.class);
    }
}
