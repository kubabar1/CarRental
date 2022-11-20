package com.carrental.authservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Collections;

import static java.util.Arrays.asList;

public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Inject
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Inject
    private UserDetailsService userDetailsService;

    @Inject
    private PasswordEncoder encoder;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3030"));
        configuration.setAllowedMethods(asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(asList("Authorization", "Cache-Control", "Content-Type", "credentials", "X-XSRF-TOKEN"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public DaoAuthenticationProvider authProvider(PasswordEncoder encoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(encoder);
        return authProvider;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider(encoder));
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // CSRF
                .csrf()
                .disable() // TODO: fix
                // CORS
                .cors()
                .configurationSource(corsConfigurationSource())
                .and()
                // login
                .formLogin()
                .successHandler((HttpServletRequest request, HttpServletResponse response, Authentication authentication) -> response.setStatus(200))
                .failureHandler((HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) -> response.setStatus(401))
                .and()
                // logout
                .logout()
                .permitAll()
                .logoutSuccessHandler((new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK)))
                .deleteCookies("JSESSIONID", "XSRF-TOKEN")
                .invalidateHttpSession(true)
                .permitAll()
                .and()
                // session
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .and()
                // exceptions
                .exceptionHandling()
                .authenticationEntryPoint(restAuthenticationEntryPoint) //default entry point returns FULL PAGE unauthorized, not well suited for rest login
                .and()
                // headers
                .headers()
                .frameOptions()
                .sameOrigin()
                .and()
                // request authorization
                .authorizeRequests()
                .antMatchers("/**")
                .permitAll();
    }
}
