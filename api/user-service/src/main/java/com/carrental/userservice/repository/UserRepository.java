package com.carrental.userservice.repository;

import com.carrental.userservice.model.entity.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends PagingAndSortingRepository<UserEntity, Long> {

    Set<UserEntity> findAll();

    Optional<UserEntity> findByEmail(String email);

    @Query("SELECT u.email FROM users u")
    Set<String> findAllEmails();
}
