package com.carrental.userservice.listener;

import com.carrental.commons.authentication.model.VerificationTokenDTO;
import com.carrental.userservice.config.properties.UserServiceProperties;
import com.carrental.userservice.model.dto.MailDTO;
import com.carrental.userservice.model.dto.TokenRequestDTO;
import com.carrental.userservice.model.event.OnResendRegistrationConfirmTokenEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.ApplicationListener;
import org.springframework.core.ParameterizedTypeReference;

public class ResendRegistrationConfirmTokenListener implements ApplicationListener<OnResendRegistrationConfirmTokenEvent> {

    private final RabbitTemplate rabbitTemplate;

    private final UserServiceProperties userServiceProperties;

    public ResendRegistrationConfirmTokenListener(RabbitTemplate rabbitTemplate, UserServiceProperties userServiceProperties) {
        this.rabbitTemplate = rabbitTemplate;
        this.userServiceProperties = userServiceProperties;
    }

    @Override
    public void onApplicationEvent(OnResendRegistrationConfirmTokenEvent event) {
        VerificationTokenDTO verificationToken = rabbitTemplate.convertSendAndReceiveAsType(
            userServiceProperties.getGenerateTokenQueue(),
            new TokenRequestDTO(event.getUserId()),
            new ParameterizedTypeReference<>() {}
        );

        if (verificationToken != null) {
            rabbitTemplate.convertAndSend(
                userServiceProperties.getSendEmailQueue(),
                createConfirmRegistrationMailText(event.getUserEmail(), verificationToken.getToken())
            );
        }
    }

    private MailDTO createConfirmRegistrationMailText(String recipientAddress, String token) {
        MailDTO mailDTO = new MailDTO();
        mailDTO.setRecipient(recipientAddress);
        mailDTO.setSubject("Resend registration confirmation");
        mailDTO.setText("Your account was successfully created.\n"
            + userServiceProperties.getRegistrationConfirmUrl()
            + token);
        return mailDTO;
    }
}
