package com.carrental.mailservice.config;

import com.carrental.mailservice.listener.SendEmailListener;
import com.carrental.mailservice.service.MailService;
import com.carrental.mailservice.service.impl.MailServiceImpl;
import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.ServerSetupTest;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

public class MailServiceCoreConfig {

    @Bean
    public GreenMail startMailServer() {
        GreenMail greenMail = new GreenMail(ServerSetupTest.SMTP_IMAP);
        greenMail.setUser("greenmail@localhost", "greenmail", "qwerty4321");
        greenMail.start();
        return greenMail;
    }

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost("localhost");
        mailSender.setPort(3025);
        mailSender.setUsername("greenmail");
        mailSender.setPassword("qwerty4321");

        Properties props = mailSender.getJavaMailProperties();
        props.put("spring.mail.properties.mail.smtp.auth", "true");
        props.put("spring.mail.properties.mail.smtp.starttls.enable", "true");
        props.put("spring.mail.properties.mail.smtp.starttls.required", "true");

        return mailSender;
    }

    @Bean
    public SendEmailListener sendEmailListener(MailService mailService) {
        return new SendEmailListener(mailService);
    }

    @Bean
    public MailService MailService(MailSender mailSender) {
        return new MailServiceImpl(mailSender);
    }
}
