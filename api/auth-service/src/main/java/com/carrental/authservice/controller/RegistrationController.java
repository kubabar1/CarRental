package com.carrental.authservice.controller;

import com.carrental.authservice.event.OnRegistrationCompleteEvent;
import com.carrental.authservice.exceptions.UserAlreadyExistException;
import com.carrental.authservice.exceptions.VerificationTokenException;
import com.carrental.authservice.model.dto.CreateUserDTO;
import com.carrental.authservice.model.dto.UserResponseDTO;
import com.carrental.authservice.model.entity.VerificationToken;
import com.carrental.authservice.service.RegistrationService;
import com.carrental.authservice.service.TokenService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin
@RequestMapping(value = "/registration")
public class RegistrationController {

    private final RegistrationService registrationService;

    private final ApplicationEventPublisher eventPublisher;

    private final TokenService tokenService;


    public RegistrationController(
            RegistrationService registrationService,
            ApplicationEventPublisher eventPublisher,
            TokenService tokenService
    ) {
        this.registrationService = registrationService;
        this.eventPublisher = eventPublisher;
        this.tokenService = tokenService;
    }

    @PutMapping(value = "/register-user")
    public ResponseEntity<UserResponseDTO> registerUser(
            @Valid @RequestBody CreateUserDTO createUserDTO,
            HttpServletRequest request
    ) {
        try {
            UserResponseDTO createdUser = registrationService.registerUser(createUserDTO);
            String appUrl = request.getContextPath();
            OnRegistrationCompleteEvent event = new OnRegistrationCompleteEvent(createdUser.getUserId(), appUrl, false);
            eventPublisher.publishEvent(event);

            return ResponseEntity.ok().body(createdUser);
        } catch (UserAlreadyExistException userAlreadyExistException) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/registration-confirm")
    public ResponseEntity<?> registrationConfirmController(@RequestParam("token") String token) {
        try {
            VerificationToken verificationToken = tokenService.verifyToken(token);
            UserResponseDTO userResponseDTO = registrationService.enableRegisteredUser(verificationToken.getUserId());
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", "http://localhost:3030/login");
            return ResponseEntity.status(HttpStatus.FOUND).headers(headers).body(userResponseDTO);
        } catch (VerificationTokenException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping(value = "/resend-registration-confirm")
    public ResponseEntity<?> resendRegistrationToken(
            @RequestParam("token") String token,
            HttpServletRequest request
    ) {
        try {
            VerificationToken verificationToken = tokenService.verifyToken(token);
            String appUrl = request.getContextPath();
            OnRegistrationCompleteEvent event = new OnRegistrationCompleteEvent(verificationToken.getUserId(), appUrl, true);
            eventPublisher.publishEvent(event);

            return ResponseEntity.ok().build();
        } catch (VerificationTokenException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getAllErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());
        return ResponseEntity
                .badRequest()
                .body(errors);
    }
}
