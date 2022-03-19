package com.carrental.bookingservice.config;

import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import com.carrental.commons.authentication.service.impl.AuthenticatedUserDataServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
        ModelMapperConfig.class,
        SpringFoxConfig.class
})
public class BookingServiceCoreConfig {

    @Bean
    public AuthenticatedUserDataService authenticatedUserDataService() {
        return new AuthenticatedUserDataServiceImpl();
    }
}
