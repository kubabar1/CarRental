package com.carrental.userservice.controller;

import com.carrental.commons.authentication.model.VerificationTokenDTO;
import com.carrental.userservice.config.properties.UserServiceProperties;
import com.carrental.userservice.model.dto.PasswordResetDTO;
import com.carrental.userservice.model.dto.PasswordResetRequestDTO;
import com.carrental.userservice.model.dto.PasswordResetResponseDTO;
import com.carrental.userservice.service.ResetPasswordService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.core.MethodParameter;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static com.carrental.commons.authentication.utils.VerificationTokenHelper.isTokenValid;

@RequestMapping("/reset-password")
public class ResetPasswordController {

    private final RabbitTemplate rabbitTemplate;

    private final ResetPasswordService resetPasswordService;

    private final UserServiceProperties userServiceProperties;

    public ResetPasswordController(
            RabbitTemplate rabbitTemplate,
            ResetPasswordService resetPasswordService,
            UserServiceProperties userServiceProperties
    ) {
        this.rabbitTemplate = rabbitTemplate;
        this.resetPasswordService = resetPasswordService;
        this.userServiceProperties = userServiceProperties;
    }

    @PostMapping("/send-email")
    public ResponseEntity<PasswordResetResponseDTO> sendResetPasswordEmailController(
            @Valid @RequestBody PasswordResetRequestDTO passwordResetRequestDTO
    ) {
        try {
            return ResponseEntity.ok().body(resetPasswordService.sendResetPasswordEmail(passwordResetRequestDTO.getEmail()));
        } catch (NoSuchElementException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/change-password")
    public ResponseEntity<?> redirectToUpdatePasswordScreenController(
            @RequestParam("token") String token
    ) {
        VerificationTokenDTO verificationToken = rabbitTemplate.convertSendAndReceiveAsType(
            userServiceProperties.getGetTokenQueue(),
            token,
            new ParameterizedTypeReference<>() {}
        );
        if (isTokenValid(verificationToken)) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", userServiceProperties.getResetPasswordUpdateTokenUrl() + verificationToken.getToken());
            return ResponseEntity.status(HttpStatus.FOUND).headers(headers).build();
        } else {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", userServiceProperties.getResetPasswordInvalidTokenUrl());
            return ResponseEntity.status(HttpStatus.FOUND).headers(headers).build();
        }
    }

    @PostMapping("/save-password")
    public ResponseEntity<PasswordResetResponseDTO> savePassword(
            @Valid @RequestBody PasswordResetDTO passwordResetDTO
    ) throws NoSuchMethodException, MethodArgumentNotValidException {
        VerificationTokenDTO verificationToken = rabbitTemplate.convertSendAndReceiveAsType(
            userServiceProperties.getGetTokenQueue(),
            passwordResetDTO.getToken(),
            new ParameterizedTypeReference<>() {}
        );
        if (isTokenValid(verificationToken)) {
            PasswordResetResponseDTO passwordResetResponseDTO;
            try {
                passwordResetResponseDTO = resetPasswordService.resetPassword(passwordResetDTO, verificationToken);
                return ResponseEntity.status(HttpStatus.OK).body(passwordResetResponseDTO);
            } catch (NoSuchElementException exception) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            MethodArgumentNotValidException methodArgumentNotValidException = new MethodArgumentNotValidException(
                    new MethodParameter(this.getClass().getMethod("savePassword", PasswordResetDTO.class), 0),
                    new BeanPropertyBindingResult(passwordResetDTO, "passwordResetDTO")
            );
            methodArgumentNotValidException.addError(new FieldError("passwordResetDTO", "token", "Invalid token"));
            throw methodArgumentNotValidException;
        }
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = ex.getBindingResult().getAllErrors().stream()
                .collect(Collectors.toMap(
                        e -> e instanceof FieldError ? ((FieldError) e).getField() : "",
                        e -> e.getDefaultMessage() == null ? "" : e.getDefaultMessage())
                );
        return ResponseEntity.badRequest().body(errors);
    }
}
