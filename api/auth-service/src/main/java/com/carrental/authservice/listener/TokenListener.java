package com.carrental.authservice.listener;

import com.carrental.authservice.exception.VerificationTokenException;
import com.carrental.authservice.model.dto.GenerateTokenRequestDTO;
import com.carrental.authservice.model.dto.VerifyTokenRequestDTO;
import com.carrental.authservice.model.dto.VerificationTokenDTO;
import com.carrental.authservice.service.TokenService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

public class TokenListener {

    private final TokenService tokenService;

    public TokenListener(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @RabbitListener(queues = {"generateTokenQueue"})
    public VerificationTokenDTO generateTokenQueue(GenerateTokenRequestDTO generateTokenRequestDTO) {
        return tokenService.createVerificationToken(generateTokenRequestDTO.getUserId());
    }

    @RabbitListener(queues = {"verifyTokenQueue"})
    public VerificationTokenDTO verifyTokenQueue(String token) {
        try {
            return tokenService.verifyToken(token);
        } catch (VerificationTokenException exception) {
            return null;
        }
    }

    @RabbitListener(queues = {"deleteTokenQueue"})
    public void deleteTokenQueue(String token) {
        tokenService.deleteTokenQueue(token);
    }
}
