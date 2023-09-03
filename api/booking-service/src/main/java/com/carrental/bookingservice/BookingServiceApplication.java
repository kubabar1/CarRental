package com.carrental.bookingservice;

import com.carrental.bookingservice.config.BookingServiceCoreConfig;
import com.carrental.bookingservice.config.security.WebSecurityConfig;
import com.carrental.commons.config.AuthenticationServiceConfig;
import com.carrental.commons.config.ModelMapperConfig;
import com.carrental.commons.config.rabbitmq.RabbitMQConfig;
import com.carrental.commons.config.SpringFoxConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import({
        AuthenticationServiceConfig.class,
        ModelMapperConfig.class,
        SpringFoxConfig.class,
        WebSecurityConfig.class,
        BookingServiceCoreConfig.class,
        RabbitMQConfig.class
})
@EnableFeignClients
public class BookingServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(BookingServiceApplication.class, args);
  }
}
