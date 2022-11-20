package com.carrental.userservice.listener;


import com.carrental.userservice.model.dto.SendMailDTO;
import com.carrental.userservice.model.dto.TokenRequestDTO;
import com.carrental.userservice.model.dto.VerificationTokenDTO;
import com.carrental.userservice.model.event.OnRegistrationCompleteEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.ApplicationListener;
import org.springframework.core.ParameterizedTypeReference;

public class RegistrationCompleteListener implements ApplicationListener<OnRegistrationCompleteEvent> {

    private final RabbitTemplate rabbitTemplate;

    public RegistrationCompleteListener(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        Long userId = event.getUserId();
        TokenRequestDTO tokenRequestDTO = new TokenRequestDTO();
        tokenRequestDTO.setUserId(userId);
        VerificationTokenDTO verificationToken = rabbitTemplate.convertSendAndReceiveAsType("generateTokenQueue", tokenRequestDTO, new ParameterizedTypeReference<>() {});

        if (verificationToken != null) {
            String recipientAddress = "greenmail@localhost";
            if (event.isResendToken()) {
                rabbitTemplate.convertAndSend("sendEmailQueue", createResendVerificationTokenMailText(recipientAddress, verificationToken.getToken()));
            } else {
                rabbitTemplate.convertAndSend("sendEmailQueue", createConfirmRegistrationMailText(recipientAddress, verificationToken.getToken()));
            }
        }
    }

    private SendMailDTO createConfirmRegistrationMailText(String recipientAddress, String token) {
        SendMailDTO sendMailDTO = new SendMailDTO();
        sendMailDTO.setRecipient(recipientAddress);
        sendMailDTO.setSubject("Registration Confirmation");
        sendMailDTO.setText("Your account was successfully created.\n"
                + "http://localhost:8080/registration/registration-confirm?token="
                + token);
        return sendMailDTO;
    }

    private SendMailDTO createResendVerificationTokenMailText(String recipientAddress, String token) {
        SendMailDTO sendMailDTO = new SendMailDTO();
        sendMailDTO.setRecipient(recipientAddress);
        sendMailDTO.setSubject("Resend verification token confirmation");
        sendMailDTO.setText("Your account was successfully created.\n"
                + "http://localhost:8080/registration/registration-confirm?token="
                + token);
        return sendMailDTO;
    }
}
