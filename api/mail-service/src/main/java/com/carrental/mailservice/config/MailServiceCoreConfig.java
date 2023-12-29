package com.carrental.mailservice.config;

import com.carrental.mailservice.config.queue.MailServiceQueueConfig;
import com.carrental.mailservice.config.properties.MailServiceProperties;
import com.carrental.mailservice.listener.SendEmailListener;
import com.carrental.mailservice.service.MailService;
import com.carrental.mailservice.service.impl.MailServiceImpl;
import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.ServerSetup;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Import({MailServiceQueueConfig.class})
public class MailServiceCoreConfig {

    @Bean
    public GreenMail greenMail(MailServiceProperties mailServiceProperties) {
        GreenMail greenMail = new GreenMail(new ServerSetup[]{
                new ServerSetup(3025, "0.0.0.0", ServerSetup.PROTOCOL_SMTP),
                new ServerSetup(3143, "0.0.0.0", ServerSetup.PROTOCOL_IMAP)
        });
        greenMail.setUser(
            mailServiceProperties.getDemoRecipientAddress(),
            mailServiceProperties.getDemoRecipientLogin(),
            mailServiceProperties.getDemoRecipientPassword()
        );
        return greenMail;
    }

    @Bean
    public GreenMailWrapper greenMailWrapper(MailServiceProperties mailServiceProperties) {
        GreenMailWrapper greenMail = new GreenMailWrapper(new ServerSetup[]{
                new ServerSetup(3025, "0.0.0.0", ServerSetup.PROTOCOL_SMTP),
                new ServerSetup(3143, "0.0.0.0", ServerSetup.PROTOCOL_IMAP)
        });
        greenMail.setUser(
            mailServiceProperties.getDemoRecipientAddress(),
            mailServiceProperties.getDemoRecipientLogin(),
            mailServiceProperties.getDemoRecipientPassword()
        );
        return greenMail;
    }

    private static class GreenMailWrapper extends GreenMail {

        public GreenMailWrapper(ServerSetup[] config) {
            super(config);
        }

        @PostConstruct
        public void stopPostConstruct() {
            start();
        }

        @PreDestroy
        public void stopPreDestroy() {
            stop();
        }
    }

    @Bean
    public JavaMailSender getJavaMailSender(MailServiceProperties mailServiceProperties) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost(mailServiceProperties.getHost());
        mailSender.setPort(mailServiceProperties.getPort());
        mailSender.setUsername(mailServiceProperties.getUsername());
        mailSender.setPassword(mailServiceProperties.getPassword());

        return mailSender;
    }

    @Bean
    public SendEmailListener sendEmailListener(MailService mailService) {
        return new SendEmailListener(mailService);
    }

    @Bean
    public MailServiceProperties mailServiceProperties() {
        return new MailServiceProperties();
    }

    @Bean
    public MailService MailService(MailSender mailSender, MailServiceProperties mailServiceProperties) {
        return new MailServiceImpl(mailSender, mailServiceProperties);
    }
}
