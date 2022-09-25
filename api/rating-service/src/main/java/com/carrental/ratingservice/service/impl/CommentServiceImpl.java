package com.carrental.ratingservice.service.impl;

import com.carrental.ratingservice.model.dto.CommentWithRateAddDTO;
import com.carrental.ratingservice.model.dto.CommentWithRateResponseDTO;
import com.carrental.ratingservice.model.entity.CommentEntity;
import com.carrental.ratingservice.model.entity.RateEntity;
import com.carrental.ratingservice.repository.CommentRepository;
import com.carrental.ratingservice.repository.RateRepository;
import com.carrental.ratingservice.service.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;

    private ModelMapper modelMapper;

    public CommentServiceImpl(CommentRepository commentRepository, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Set<CommentWithRateResponseDTO> getComments() {
        return commentRepository
                .findAll()
                .stream()
                .map(comment -> modelMapper.map(comment, CommentWithRateResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Set<CommentWithRateResponseDTO> getCommentsByUserId(Long userId) throws NoSuchElementException {
        return commentRepository
                .findCommentEntitiesByUserIdOrderByCreationDateDesc(userId)
                .stream()
                .map(comment -> modelMapper.map(comment, CommentWithRateResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Page<CommentWithRateResponseDTO> getCommentsByVehicleId(Long vehicleId, Pageable pageable) throws NoSuchElementException {
        Page<CommentEntity> commentEntityPage = commentRepository.findCommentEntitiesByVehicleIdOrderByCreationDateDesc(vehicleId, pageable);
        List<CommentWithRateResponseDTO> commentWithRateResponseDTOList = commentEntityPage.getContent()
                .stream()
                .map(comment -> modelMapper.map(comment, CommentWithRateResponseDTO.class))
                .collect(Collectors.toList());

        return new PageImpl<>(commentWithRateResponseDTOList, pageable, commentEntityPage.getTotalElements());
    }

    @Override
    public CommentWithRateResponseDTO addCommentWithRate(CommentWithRateAddDTO commentWithRateAddDTO) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        RateEntity rateEntity = new RateEntity();
        rateEntity.setRate(commentWithRateAddDTO.getRate());
        rateEntity.setUserId(commentWithRateAddDTO.getUserId());
        rateEntity.setVehicleId(commentWithRateAddDTO.getVehicleId());
        rateEntity.setCreationDate(now);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent(commentWithRateAddDTO.getContent());
        commentEntity.setUserId(commentWithRateAddDTO.getUserId());
        commentEntity.setVehicleId(commentWithRateAddDTO.getVehicleId());
        commentEntity.setCreationDate(now);
        commentEntity.setRate(rateEntity);

        CommentEntity savedCommentEntity = commentRepository.save(commentEntity);

        CommentWithRateResponseDTO commentWithRateResponseDTO = new CommentWithRateResponseDTO();
        commentWithRateResponseDTO.setId(savedCommentEntity.getId());
        commentWithRateResponseDTO.setContent(savedCommentEntity.getContent());
        commentWithRateResponseDTO.setCreationDate(dtf.format(savedCommentEntity.getCreationDate()));
        commentWithRateResponseDTO.setRate(savedCommentEntity.getRate().getRate());
        commentWithRateResponseDTO.setUserId(savedCommentEntity.getUserId());
        commentWithRateResponseDTO.setVehicleId(savedCommentEntity.getVehicleId());

        return commentWithRateResponseDTO;
    }
}
