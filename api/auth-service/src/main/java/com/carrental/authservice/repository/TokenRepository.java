package com.carrental.authservice.repository;

import com.carrental.authservice.model.entity.VerificationTokenEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TokenRepository extends CrudRepository<VerificationTokenEntity, Long> {

    Optional<VerificationTokenEntity> findByToken(String token);
}
