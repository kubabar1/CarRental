package com.carrental.userservice.service;

import com.carrental.commons.authentication.model.VerificationTokenDTO;
import com.carrental.userservice.model.dto.PasswordResetDTO;
import com.carrental.userservice.model.dto.PasswordResetResponseDTO;

import java.util.NoSuchElementException;

public interface ResetPasswordService {

    PasswordResetResponseDTO sendResetPasswordEmail(String email) throws NoSuchElementException;

    PasswordResetResponseDTO resetPassword(PasswordResetDTO passwordResetDTO, VerificationTokenDTO verificationToken) throws NoSuchElementException;
}