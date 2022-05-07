package com.carrental.userservice.repository;

import com.carrental.userservice.model.entity.UserEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Set;

public interface UserRepository extends PagingAndSortingRepository<UserEntity, Long> {

    Set<UserEntity> findAll();
}
