package com.carrental.userservice.listener;

import com.carrental.commons.authentication.model.VerificationTokenDTO;
import com.carrental.userservice.config.properties.UserServiceProperties;
import com.carrental.userservice.model.dto.MailDTO;
import com.carrental.userservice.model.dto.TokenRequestDTO;
import com.carrental.userservice.model.event.OnRegistrationCompleteEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.ApplicationListener;
import org.springframework.core.ParameterizedTypeReference;

public class RegistrationCompleteListener implements ApplicationListener<OnRegistrationCompleteEvent> {

    private final RabbitTemplate rabbitTemplate;

    private final UserServiceProperties userServiceProperties;

    public RegistrationCompleteListener(RabbitTemplate rabbitTemplate, UserServiceProperties userServiceProperties) {
        this.rabbitTemplate = rabbitTemplate;
        this.userServiceProperties = userServiceProperties;
    }

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        VerificationTokenDTO verificationToken = rabbitTemplate.convertSendAndReceiveAsType(
            "generateTokenQueue",
            new TokenRequestDTO(event.getUserId()),
            new ParameterizedTypeReference<>() {}
        );

        if (verificationToken != null) {
            rabbitTemplate.convertAndSend(
                "sendEmailQueue",
                createResendVerificationTokenMailText(event.getUserEmail(), verificationToken.getToken())
            );
        }
    }

    private MailDTO createResendVerificationTokenMailText(String recipientAddress, String token) {
        MailDTO mailDTO = new MailDTO();
        mailDTO.setRecipient(recipientAddress);
        mailDTO.setSubject("Registration confirmation");
        mailDTO.setText("Your account was successfully created.\n"
            + userServiceProperties.getRegistrationConfirmUrl()
            + token);
        return mailDTO;
    }
}
