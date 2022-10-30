package com.carrental.authservice.event.listener;

import com.carrental.authservice.config.EmbeddedUsersDBStub;
import com.carrental.authservice.event.OnRegistrationCompleteEvent;
import com.carrental.authservice.model.entity.VerificationToken;
import com.carrental.authservice.service.MailService;
import com.carrental.authservice.service.TokenService;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {

    private final TokenService tokenService;

    private final JavaMailSender mailSender;

    private final EmbeddedUsersDBStub embeddedUsersDBStub;

    private final MailService mailService;

    public RegistrationListener(
            TokenService tokenService,
            JavaMailSender mailSender,
            EmbeddedUsersDBStub embeddedUsersDBStub,
            MailService mailService
    ) {
        this.tokenService = tokenService;
        this.mailSender = mailSender;
        this.embeddedUsersDBStub = embeddedUsersDBStub;
        this.mailService = mailService;
    }

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        this.onConfirmRegistration(event);
    }

    private void onConfirmRegistration(OnRegistrationCompleteEvent event) {
        Long userId = event.getUserId();
        VerificationToken verificationToken = tokenService.createVerificationToken(userId);
        // TODO: fix recipient address
        // String recipientAddress = embeddedUsersDBStub.getUserById(userId).getEmail();
        String recipientAddress = "greenmail@localhost";

        SimpleMailMessage email;

        if (event.isResendToken()) {
            email = mailService.createResendVerificationTokenMail(
                    recipientAddress,
                    event.getAppUrl(),
                    verificationToken.getToken());
        } else {
            email = mailService.createConfirmRegistrationMail(
                    recipientAddress,
                    event.getAppUrl(),
                    verificationToken.getToken());
        }

        mailSender.send(email);
    }
}
