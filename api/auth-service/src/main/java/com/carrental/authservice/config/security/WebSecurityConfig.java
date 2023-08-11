package com.carrental.authservice.config.security;

import com.carrental.commons.authentication.config.IgnoreAuthentication;
import com.carrental.commons.authentication.config.JwtRequestFilter;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Import({FiltersConfig.class, CorsConfig.class, IgnoreAuthenticationAuthService.class})
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Inject
    private CorsConfigurationSource corsConfigurationSource;

    @Inject
    private UserDetailsService userDetailsService;

    @Inject
    private JwtRequestFilter jwtRequestFilter;

    @Inject
    private PasswordEncoder encoder;

    @Inject
    private List<IgnoreAuthentication> ignoreAuthentications;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(encoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // CSRF
        http.csrf()
                .disable(); // TODO: fix
        // CORS
        http.cors()
                .configurationSource(corsConfigurationSource);
        // login
        // http.formLogin()
        // .successHandler((HttpServletRequest request, HttpServletResponse response, Authentication authentication) -> response.setStatus(200))
        // .failureHandler((HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) -> response.setStatus(401))
        // logout
        // .logout().permitAll().logoutSuccessHandler((new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))).deleteCookies("JSESSIONID") // be "XSRF-TOKEN"
        // .invalidateHttpSession(true).permitAll()
        // .and()
        // session
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // exceptions
        http.exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized")); //default entry point returns FULL PAGE unauthorized, not well suited for rest login
        // headers
        http.headers().frameOptions().sameOrigin();
        // remember me TODO: fix
        // http.rememberMe().key("qwerty").tokenRepository(persistentTokenRepository).userDetailsService(userDetailsService);
        // request authorization
        http.authorizeRequests()
                .antMatchers(
                    ignoreAuthentications.stream()
                        .map(it -> it.getPermitAllAntPatterns().toArray(String[]::new))
                        .flatMap(Arrays::stream)
                        .collect(Collectors.toSet())
                        .toArray(String[]::new)
                ).permitAll()
                .anyRequest().authenticated();

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
