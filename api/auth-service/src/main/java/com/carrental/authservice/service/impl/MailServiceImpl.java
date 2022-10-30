package com.carrental.authservice.service.impl;

import com.carrental.authservice.service.MailService;
import org.springframework.mail.SimpleMailMessage;

public class MailServiceImpl implements MailService {

    @Override
    public SimpleMailMessage createConfirmRegistrationMail(String recipientAddress, String appUrl, String token) {
        String subject = "Registration Confirmation";
        String confirmationUrl = appUrl + "/registration/registration-confirm?token=" + token;
        String message = "Your account was successfully created.";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message + "\r\n" + "http://localhost:8080" + confirmationUrl);
        return email;
    }

    @Override
    public SimpleMailMessage createResendVerificationTokenMail(String recipientAddress, String appUrl, String token) {
        String subject = "Resend verification token confirmation";
        String confirmationUrl = appUrl + "/registration/registration-confirm?token=" + token;
        String message = "Your account was successfully created.";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message + "\r\n" + "http://localhost:8080" + confirmationUrl);
        return email;
    }
}
