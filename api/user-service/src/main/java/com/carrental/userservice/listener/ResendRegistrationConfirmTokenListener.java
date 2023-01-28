package com.carrental.userservice.listener;

import com.carrental.commons.authentication.model.VerificationTokenDTO;
import com.carrental.userservice.model.dto.SendMailDTO;
import com.carrental.userservice.model.dto.TokenRequestDTO;
import com.carrental.userservice.model.event.OnResendRegistrationConfirmTokenEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.ApplicationListener;
import org.springframework.core.ParameterizedTypeReference;

public class ResendRegistrationConfirmTokenListener implements ApplicationListener<OnResendRegistrationConfirmTokenEvent> {

    private final RabbitTemplate rabbitTemplate;

    public ResendRegistrationConfirmTokenListener(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public void onApplicationEvent(OnResendRegistrationConfirmTokenEvent event) {
        VerificationTokenDTO verificationToken = rabbitTemplate.convertSendAndReceiveAsType(
            "generateTokenQueue",
            new TokenRequestDTO(event.getUserId()),
            new ParameterizedTypeReference<>() {}
        );

        if (verificationToken != null) {
            String recipientAddress = "greenmail@localhost";
            rabbitTemplate.convertAndSend(
                "sendEmailQueue",
                createConfirmRegistrationMailText(recipientAddress, verificationToken.getToken())
            );
        }
    }

    private SendMailDTO createConfirmRegistrationMailText(String recipientAddress, String token) {
        SendMailDTO sendMailDTO = new SendMailDTO();
        sendMailDTO.setRecipient(recipientAddress);
        sendMailDTO.setSubject("Resend registration confirmation");
        sendMailDTO.setText("Your account was successfully created.\n"
            + "http://localhost:8080/registration/registration-confirm?token="
            + token);
        return sendMailDTO;
    }
}
