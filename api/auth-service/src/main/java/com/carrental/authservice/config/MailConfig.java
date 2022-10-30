package com.carrental.authservice.config;

import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.ServerSetupTest;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

public class MailConfig {

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
}
