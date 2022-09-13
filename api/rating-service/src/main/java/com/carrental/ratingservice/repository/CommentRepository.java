package com.carrental.ratingservice.repository;

import com.carrental.ratingservice.model.entity.CommentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Set;

public interface CommentRepository extends PagingAndSortingRepository<CommentEntity, Long> {

    Set<CommentEntity> findAll();

    Set<CommentEntity> findCommentEntitiesByUserIdOrderByCreationDateDesc(Long userId);

    Page<CommentEntity> findCommentEntitiesByVehicleIdOrderByCreationDateDesc(Long vehicleId, Pageable pageable);
}
