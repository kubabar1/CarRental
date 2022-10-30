package com.carrental.authservice.repository;

import com.carrental.authservice.model.entity.VerificationToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TokenRepository extends CrudRepository<VerificationToken, Long> {

    Optional<VerificationToken> findByToken(String token);
}
