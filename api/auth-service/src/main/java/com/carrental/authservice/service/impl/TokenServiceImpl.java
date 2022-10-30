package com.carrental.authservice.service.impl;

import com.carrental.authservice.exceptions.VerificationTokenException;
import com.carrental.authservice.model.entity.VerificationToken;
import com.carrental.authservice.repository.TokenRepository;
import com.carrental.authservice.service.TokenService;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import static com.carrental.authservice.model.entity.VerificationToken.VERIFICATION_TOKEN_EXPIRATION_SEC;

public class TokenServiceImpl implements TokenService {

    private final TokenRepository tokenRepository;

    public TokenServiceImpl(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public VerificationToken createVerificationToken(Long userId) {
        VerificationToken verificationToken = new VerificationToken();
        String token = UUID.randomUUID().toString();
        verificationToken.setToken(token);
        verificationToken.setUserId(userId);
        verificationToken.setExpiryDate(verificationToken.calculateExpiryDate(VERIFICATION_TOKEN_EXPIRATION_SEC));
        return tokenRepository.save(verificationToken);
    }

    @Override
    public VerificationToken verifyToken(String token) throws VerificationTokenException {
        VerificationToken verificationToken = tokenRepository
                .findByToken(token)
                .orElseThrow(() -> new VerificationTokenException("Token with given ID not found"));

        if (isVerificationTokenExpired(verificationToken.getExpiryDate())) {
            throw new VerificationTokenException("Your token expired");
        }

        return verificationToken;
    }

    private boolean isVerificationTokenExpired(Date expiryDate) {
        Calendar calendar = Calendar.getInstance();
        return expiryDate.getTime() - calendar.getTime().getTime() <= 0;
    }
}
