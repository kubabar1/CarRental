package com.carrental.ratingservice.repository;

import com.carrental.ratingservice.model.entity.CommentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Set;

public interface CommentRepository extends PagingAndSortingRepository<CommentEntity, Long> {

    Set<CommentEntity> findAll();

    Set<CommentEntity> findCommentEntitiesByUserId(Long userId);

    Page<CommentEntity> findCommentEntitiesByVehicleId(Long vehicleId, Pageable pageable);
}
