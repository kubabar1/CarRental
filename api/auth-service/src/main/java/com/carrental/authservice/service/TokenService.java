package com.carrental.authservice.service;

import com.carrental.authservice.model.dto.VerificationTokenDTO;

public interface TokenService {

    VerificationTokenDTO createVerificationToken(Long userId);

    VerificationTokenDTO getToken(String token);

    void deleteToken(String token);
}
