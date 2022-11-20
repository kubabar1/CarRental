package com.carrental.authservice.service;

import com.carrental.authservice.exception.VerificationTokenException;
import com.carrental.authservice.model.dto.VerificationTokenDTO;

public interface TokenService {

    VerificationTokenDTO createVerificationToken(Long userId);

    VerificationTokenDTO verifyToken(String token) throws VerificationTokenException;
}
