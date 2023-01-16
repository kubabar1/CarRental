package com.carrental.authservice;

import com.carrental.commons.config.AuthenticationServiceConfig;
import com.carrental.commons.config.ModelMapperConfig;
import com.carrental.commons.config.SpringFoxConfig;
import com.carrental.authservice.config.AuthServiceCoreConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@Import({
        AuthenticationServiceConfig.class,
        ModelMapperConfig.class,
        SpringFoxConfig.class,
        AuthServiceCoreConfig.class
})
@SpringBootApplication
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }
}