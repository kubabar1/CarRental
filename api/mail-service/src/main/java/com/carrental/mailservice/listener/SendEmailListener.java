package com.carrental.mailservice.listener;

import com.carrental.mailservice.model.SendMailDTO;
import com.carrental.mailservice.service.MailService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

public class SendEmailListener {

    private final MailService mailService;

    public SendEmailListener(MailService mailService) {
        this.mailService = mailService;
    }

    @RabbitListener(queues = {"sendEmailQueue"})
    public void sendEmail(SendMailDTO sendMailDTO) {
        mailService.sendEmail(sendMailDTO);
    }
}
