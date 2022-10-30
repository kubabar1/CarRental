package com.carrental.authservice.service;

import com.carrental.authservice.exceptions.VerificationTokenException;
import com.carrental.authservice.model.entity.VerificationToken;

public interface TokenService {

    VerificationToken createVerificationToken(Long userId);

    VerificationToken verifyToken(String token) throws VerificationTokenException;
}
