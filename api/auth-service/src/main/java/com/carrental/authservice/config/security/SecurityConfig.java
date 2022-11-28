package com.carrental.authservice.config.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Inject
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Inject
    private CorsConfigurationSource corsConfigurationSource;

    @Inject
    private DaoAuthenticationProvider authProvider;

    @Inject
    private PersistentTokenRepository persistentTokenRepository;

    @Inject
    private UserDetailsService userDetailsService;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // CSRF
                .csrf()
                .disable() // TODO: fix
                // CORS
                .cors()
                .configurationSource(corsConfigurationSource)
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
                .deleteCookies("JSESSIONID") //  "XSRF-TOKEN"
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
                // remember me
                .and()
                .rememberMe()
                .key("qwerty") // TODO: fix - move to props
                .tokenRepository(persistentTokenRepository)
                .userDetailsService(userDetailsService)
                .and()
                // request authorization
                .authorizeRequests()
                .antMatchers("/login", "/authentication/**", "/locations", "/vehicles/**", "/comments/**",
                        "/registration/**", "/h2-console/**").permitAll()
                .anyRequest().authenticated();
    }
}
