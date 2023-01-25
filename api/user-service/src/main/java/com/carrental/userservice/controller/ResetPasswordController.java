package com.carrental.userservice.controller;

import com.carrental.userservice.model.dto.PasswordResetDTO;
import com.carrental.userservice.model.dto.PasswordResetRequestDTO;
import com.carrental.userservice.model.dto.PasswordResetResponseDTO;
import com.carrental.userservice.model.dto.VerificationTokenDTO;
import com.carrental.userservice.service.ResetPasswordService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@CrossOrigin
@RequestMapping("/reset-password")
public class ResetPasswordController {

    private final RabbitTemplate rabbitTemplate;

    private final ResetPasswordService resetPasswordService;

    public ResetPasswordController(RabbitTemplate rabbitTemplate, ResetPasswordService resetPasswordService) {
        this.rabbitTemplate = rabbitTemplate;
        this.resetPasswordService = resetPasswordService;
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
    public ResponseEntity redirectToUpdatePasswordScreenController(
            @RequestParam("token") String token
    ) {
        VerificationTokenDTO verificationToken = rabbitTemplate.convertSendAndReceiveAsType(
                "verifyTokenQueue",
                token,
                new ParameterizedTypeReference<>() {}
        );
        if (verificationToken != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", "http://localhost:3030/reset-password/update?token=" + verificationToken.getToken());
            return ResponseEntity.status(HttpStatus.FOUND).headers(headers).build();
        } else {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", "http://localhost:3030/login");
            return ResponseEntity.status(HttpStatus.FOUND).headers(headers).build();
        }
    }

    @PostMapping("/save-password")
    public ResponseEntity<PasswordResetResponseDTO> savePassword(
            @Valid @RequestBody PasswordResetDTO passwordResetDTO
    ) {
        VerificationTokenDTO verificationToken = rabbitTemplate.convertSendAndReceiveAsType(
                "verifyTokenQueue",
                passwordResetDTO.getToken(),
                new ParameterizedTypeReference<>() {}
        );
        if (verificationToken != null) {
            PasswordResetResponseDTO passwordResetResponseDTO;
            try {
                passwordResetResponseDTO = resetPasswordService.resetPassword(passwordResetDTO, verificationToken);
                return ResponseEntity.status(HttpStatus.OK).body(passwordResetResponseDTO);
            } catch (NoSuchElementException exception) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
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
