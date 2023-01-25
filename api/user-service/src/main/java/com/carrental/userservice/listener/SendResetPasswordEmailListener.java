package com.carrental.userservice.listener;

import com.carrental.userservice.model.dto.SendMailDTO;
import com.carrental.userservice.model.dto.TokenRequestDTO;
import com.carrental.userservice.model.dto.VerificationTokenDTO;
import com.carrental.userservice.model.entity.UserEntity;
import com.carrental.userservice.model.event.OnSendResetPasswordEmailEvent;
import com.carrental.userservice.repository.UserRepository;
import com.carrental.userservice.service.UserService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.ApplicationListener;
import org.springframework.core.ParameterizedTypeReference;

public class SendResetPasswordEmailListener implements ApplicationListener<OnSendResetPasswordEmailEvent> {

    private final RabbitTemplate rabbitTemplate;

    public SendResetPasswordEmailListener(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public void onApplicationEvent(OnSendResetPasswordEmailEvent event) {
        VerificationTokenDTO verificationToken = rabbitTemplate.convertSendAndReceiveAsType(
                "generateTokenQueue",
                new TokenRequestDTO(event.getUserId()),
                new ParameterizedTypeReference<>() {}
        );

        if (verificationToken != null) {
            String recipientAddress = "greenmail@localhost";
            rabbitTemplate.convertAndSend(
                    "sendEmailQueue",
                    createConfirmPasswordResetMailText(recipientAddress, verificationToken.getToken())
            );
        }
    }

    private SendMailDTO createConfirmPasswordResetMailText(String recipientAddress, String token) {
        SendMailDTO sendMailDTO = new SendMailDTO();
        sendMailDTO.setRecipient(recipientAddress);
        sendMailDTO.setSubject("Password Reset Confirmation");
        sendMailDTO.setText("Click below link to change your password.\n"
                + "http://localhost:8080/reset-password/change-password?token="
                + token);
        return sendMailDTO;
    }
}
