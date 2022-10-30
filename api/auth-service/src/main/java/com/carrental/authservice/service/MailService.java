package com.carrental.authservice.service;

import org.springframework.mail.SimpleMailMessage;

public interface MailService {

    SimpleMailMessage createConfirmRegistrationMail(String recipientAddress, String appUrl, String token);

    SimpleMailMessage createResendVerificationTokenMail(String recipientAddress, String appUrl, String token);
}
