package com.carrental.mailservice.service.impl;

import com.carrental.mailservice.model.MailDTO;
import com.carrental.mailservice.model.MultipleRecipientsMailsDTO;
import com.carrental.mailservice.service.MailService;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;

import java.util.List;
import java.util.stream.Collectors;

public class MailServiceImpl implements MailService {

    private final MailSender mailSender;

    public MailServiceImpl(MailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(MailDTO mailDTO) {
        SimpleMailMessage email = createMail(mailDTO);
        mailSender.send(email);
    }

    @Override
    public void sendMultipleRecipientsMails(MultipleRecipientsMailsDTO multipleRecipientsMailsDTO) {
        createEmailsForMultipleRecipients(multipleRecipientsMailsDTO).forEach(mailSender::send);
    }

    private SimpleMailMessage createMail(MailDTO mailDTO) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(mailDTO.getRecipient());
        email.setSubject(mailDTO.getSubject());
        email.setText(mailDTO.getText());
        return email;
    }

    private List<SimpleMailMessage> createEmailsForMultipleRecipients(
        MultipleRecipientsMailsDTO multipleRecipientsMailsDTO
    ) {
        return multipleRecipientsMailsDTO.getRecipients().stream().map(recipient -> {
            SimpleMailMessage email = new SimpleMailMessage();
            // TODO: fix (change recipientAddress to recipient)
            String recipientAddress = "greenmail@localhost";
            email.setTo(recipientAddress);
            email.setSubject(multipleRecipientsMailsDTO.getSubject());
            email.setText(multipleRecipientsMailsDTO.getText());
            return email;
        }).collect(Collectors.toList());
    }
}
