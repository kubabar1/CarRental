package com.carrental.userservice.service.impl;

import com.carrental.commons.authentication.model.VerificationTokenDTO;
import com.carrental.userservice.model.dto.PasswordResetDTO;
import com.carrental.userservice.model.dto.PasswordResetResponseDTO;
import com.carrental.userservice.model.entity.UserEntity;
import com.carrental.userservice.model.event.OnSendResetPasswordEmailEvent;
import com.carrental.userservice.repository.UserRepository;
import com.carrental.userservice.service.ResetPasswordService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.NoSuchElementException;

public class ResetPasswordServiceImpl implements ResetPasswordService {

    private final UserRepository userRepository;

    private final ApplicationEventPublisher eventPublisher;

    private final PasswordEncoder passwordEncoder;

    private final RabbitTemplate rabbitTemplate;

    public ResetPasswordServiceImpl(
            UserRepository userRepository,
            ApplicationEventPublisher eventPublisher,
            PasswordEncoder passwordEncoder,
            RabbitTemplate rabbitTemplate
    ) {
        this.userRepository = userRepository;
        this.eventPublisher = eventPublisher;
        this.passwordEncoder = passwordEncoder;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public PasswordResetResponseDTO sendResetPasswordEmail(String email) throws NoSuchElementException {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        eventPublisher.publishEvent(new OnSendResetPasswordEmailEvent(this, userEntity.getId()));
        return new PasswordResetResponseDTO(email);
    }

    @Override
    public PasswordResetResponseDTO resetPassword(PasswordResetDTO passwordResetDTO, VerificationTokenDTO verificationToken) throws NoSuchElementException {
        UserEntity userEntity = userRepository.findById(verificationToken.getUserId()).orElseThrow(NoSuchElementException::new);
        userEntity.setPassword(passwordEncoder.encode(passwordResetDTO.getNewPassword()));
        userRepository.save(userEntity);
        rabbitTemplate.convertAndSend("deleteTokenQueue", passwordResetDTO.getToken());
        return new PasswordResetResponseDTO(userEntity.getEmail());
    }
}
