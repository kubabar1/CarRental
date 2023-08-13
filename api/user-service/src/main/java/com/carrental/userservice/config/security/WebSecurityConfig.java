package com.carrental.userservice.config.security;

import com.carrental.commons.authentication.config.*;
import com.carrental.commons.authentication.config.cors.CorsConfig;
import com.carrental.commons.authentication.config.cors.CorsConfigSource;
import com.carrental.commons.authentication.config.jwt.JwtSecurityContextConfig;
import com.carrental.commons.authentication.config.jwt.JwtSecurityContextRepository;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

@Import({CorsConfig.class, JwtSecurityContextConfig.class})
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Inject
    private CorsConfigSource corsConfigurationSource;

    @Inject
    public IgnoreAuthentication ignoreAuthentication;

    @Inject
    public JwtSecurityContextRepository jwtSecurityContextRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // CSRF
        http.csrf().disable(); // TODO: fix
        // session
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // CORS
        http.cors().configurationSource(corsConfigurationSource);
        // context repository
        http.securityContext().securityContextRepository(jwtSecurityContextRepository);
        // exceptions - default entry point returns FULL PAGE unauthorized, not well suited for rest login
        http.exceptionHandling().authenticationEntryPoint((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized"));
        // headers
        http.headers().frameOptions().sameOrigin();
        // request authorization
        http.authorizeRequests()
            .antMatchers(ignoreAuthentication.getPermitAllAntPatterns().toArray(String[]::new)).permitAll()
            .anyRequest().authenticated();
    }
}
