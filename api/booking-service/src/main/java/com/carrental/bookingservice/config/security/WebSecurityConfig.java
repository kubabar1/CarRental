package com.carrental.bookingservice.config.security;

import com.carrental.commons.authentication.config.IgnoreAuthentication;
import com.carrental.commons.authentication.config.JwtRequestFilter;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

@Import({FiltersConfig.class, CorsConfig.class})
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Inject
    public JwtRequestFilter jwtRequestFilter;

    @Inject
    public CorsConfigurationSource corsConfigurationSource;

    @Inject
    public IgnoreAuthentication ignoreAuthentication;

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
                // headers
                .headers()
                .frameOptions()
                .sameOrigin()
                .and()
                // session
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // exceptions
                .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized"))
                .and()
                // request authorization
                .authorizeRequests()
                .antMatchers(ignoreAuthentication.getPermitAllAntPatterns().toArray(String[]::new)).permitAll()
                .anyRequest().authenticated();

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
