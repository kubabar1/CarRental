package com.carrental.userservice.controller;

import com.carrental.commons.authentication.model.VerificationTokenDTO;
import com.carrental.userservice.exception.UserAlreadyExistException;
import com.carrental.userservice.model.dto.CreateUserDTO;
import com.carrental.userservice.model.dto.UserResponseDTO;
import com.carrental.userservice.model.event.OnRegistrationCompleteEvent;
import com.carrental.userservice.model.event.OnResendRegistrationConfirmTokenEvent;
import com.carrental.userservice.service.UserService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;
import java.util.stream.Collectors;

import static com.carrental.commons.authentication.utils.VerificationTokenHelper.isTokenExpired;
import static com.carrental.commons.authentication.utils.VerificationTokenHelper.isTokenValid;


@CrossOrigin
@RequestMapping(value = "/registration")
public class RegistrationController {

    private final UserService userService;

    private final ApplicationEventPublisher eventPublisher;

    private final RabbitTemplate rabbitTemplate;

    public RegistrationController(
        UserService userService,
        ApplicationEventPublisher eventPublisher,
        RabbitTemplate rabbitTemplate
    ) {
        this.userService = userService;
        this.eventPublisher = eventPublisher;
        this.rabbitTemplate = rabbitTemplate;
    }

    @PutMapping(value = "/register-user")
    public ResponseEntity<UserResponseDTO> registerUserController(@Valid @RequestBody CreateUserDTO createUserDTO) {
        try {
            UserResponseDTO createdUser = userService.createUser(createUserDTO);
            eventPublisher.publishEvent(new OnRegistrationCompleteEvent(this, createdUser.getId()));
            return ResponseEntity.ok().body(createdUser);
        } catch (UserAlreadyExistException exception) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/registration-confirm")
    public ResponseEntity<?> registrationConfirmController(@RequestParam("token") String token) {
        VerificationTokenDTO verificationToken = rabbitTemplate.convertSendAndReceiveAsType(
            "getTokenQueue",
            token,
            new ParameterizedTypeReference<>() {}
        );
        String redirectUrl;
        if (isTokenValid(verificationToken)) {
            userService.enableUser(verificationToken.getUserId(), verificationToken.getToken());
            redirectUrl = "http://localhost:3030/login";
        } else {
            if (verificationToken != null && verificationToken.getExpiryDate() != null && isTokenExpired(verificationToken.getExpiryDate())) {
                redirectUrl = "http://localhost:3030/registration/expired-token?token=" + token;
            } else {
                redirectUrl = "http://localhost:3030/registration/invalid-token";
            }
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", redirectUrl);
        return ResponseEntity.status(HttpStatus.FOUND).headers(headers).build();
    }

    @GetMapping(value = "/resend-registration-confirm")
    public ResponseEntity<?> resendRegistrationToken(@RequestParam("token") String token) {
        VerificationTokenDTO verificationToken = rabbitTemplate.convertSendAndReceiveAsType(
            "getTokenQueue",
            token,
            new ParameterizedTypeReference<>() {}
        );
        String redirectUrl;
        if (verificationToken != null && verificationToken.getUserId() != null) {
            eventPublisher.publishEvent(new OnResendRegistrationConfirmTokenEvent(this, verificationToken.getUserId()));
            redirectUrl = "http://localhost:3030/registration/confirm-mail";
        } else {
            redirectUrl = "http://localhost:3030/registration/invalid-token";
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", redirectUrl);
        return ResponseEntity.status(HttpStatus.FOUND).headers(headers).build();
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
