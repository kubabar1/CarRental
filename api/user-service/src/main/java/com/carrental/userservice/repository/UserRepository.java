package com.carrental.userservice.repository;

import com.carrental.userservice.model.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends PagingAndSortingRepository<UserEntity, Long>, JpaSpecificationExecutor<UserEntity> {

//    Page<UserEntity> findAll(Pageable pageable);

    Optional<UserEntity> findByEmail(String email);

    @Query("SELECT u.email FROM users u")
    Set<String> findAllEmails();
}
