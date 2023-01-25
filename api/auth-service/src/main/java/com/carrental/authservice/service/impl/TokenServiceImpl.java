package com.carrental.authservice.service.impl;

import com.carrental.authservice.exception.VerificationTokenException;
import com.carrental.authservice.model.dto.VerificationTokenDTO;
import com.carrental.authservice.model.entity.VerificationTokenEntity;
import com.carrental.authservice.repository.TokenRepository;
import com.carrental.authservice.service.TokenService;
import org.modelmapper.ModelMapper;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import static com.carrental.authservice.model.entity.VerificationTokenEntity.VERIFICATION_TOKEN_EXPIRATION_SEC;

public class TokenServiceImpl implements TokenService {

    private final TokenRepository tokenRepository;

    private final ModelMapper modelMapper;

    public TokenServiceImpl(TokenRepository tokenRepository, ModelMapper modelMapper) {
        this.tokenRepository = tokenRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public VerificationTokenDTO createVerificationToken(Long userId) {
        VerificationTokenEntity verificationTokenEntity = new VerificationTokenEntity();
        String token = UUID.randomUUID().toString();
        verificationTokenEntity.setToken(token);
        verificationTokenEntity.setUserId(userId);
        verificationTokenEntity.setExpiryDate(verificationTokenEntity.calculateExpiryDate(VERIFICATION_TOKEN_EXPIRATION_SEC));
        return modelMapper.map(tokenRepository.save(verificationTokenEntity), VerificationTokenDTO.class);
    }

    @Override
    public VerificationTokenDTO verifyToken(String token) throws VerificationTokenException {
        VerificationTokenEntity verificationTokenEntity = tokenRepository
                .findByToken(token)
                .orElseThrow(() -> new VerificationTokenException("Token with given ID not found"));

        if (isVerificationTokenExpired(verificationTokenEntity.getExpiryDate())) {
            throw new VerificationTokenException("Your token expired");
        }

        return modelMapper.map(verificationTokenEntity, VerificationTokenDTO.class);
    }

    @Override
    public void deleteTokenQueue(String token) {
        VerificationTokenEntity verificationTokenEntity = tokenRepository
                .findByToken(token)
                .orElseThrow(() -> new VerificationTokenException("Token with given ID not found"));
        tokenRepository.delete(verificationTokenEntity);
    }

    private boolean isVerificationTokenExpired(Date expiryDate) {
        Calendar calendar = Calendar.getInstance();
        return expiryDate.getTime() - calendar.getTime().getTime() <= 0;
    }
}
