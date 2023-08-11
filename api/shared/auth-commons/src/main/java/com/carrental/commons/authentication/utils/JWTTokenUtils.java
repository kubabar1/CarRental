package com.carrental.commons.authentication.utils;

import com.carrental.commons.authentication.model.AuthenticatedUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public final class JWTTokenUtils {

    private static final JWTTokenUtils instance = new JWTTokenUtils();

    private JWTTokenUtils(){}

    public static JWTTokenUtils getInstance() {
        return instance;
    }

    public String getUsernameFromToken(String token, String secret) {
        return getClaimFromToken(token, Claims::getSubject, secret);
    }

    public AuthenticatedUser getAuthenticatedUserFromToken(String token, String secret) {
        final Claims claims = getAllClaimsFromToken(token, secret);
        Long userId = claims.get("userId", Long.class);
        String name = claims.get("name", String.class);
        String surname = claims.get("surname", String.class);
        String phone = claims.get("phone", String.class);
        String birthDate = claims.get("birthDate", String.class);
        String email = claims.get("email", String.class);
        List<String> authorities = Arrays.asList(claims.get("authorities", String.class).split(","));
        Boolean enabled = claims.get("enabled", Boolean.class);
        Boolean isAccountNonExpired = claims.get("isAccountNonExpired", Boolean.class);
        Boolean credentialsNonExpired = claims.get("credentialsNonExpired", Boolean.class);
        Boolean isAccountNonLocked = claims.get("isAccountNonLocked", Boolean.class);
        return new AuthenticatedUser(
            userId,
            name,
            surname,
            phone,
            birthDate,
            email,
            "",
            enabled,
            isAccountNonExpired,
            credentialsNonExpired,
            isAccountNonLocked,
            authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toSet())
        );
    }

    public Date getExpirationDateFromToken(String token, String secret) {
        return getClaimFromToken(token, Claims::getExpiration, secret);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver, String secret) {
        final Claims claims = getAllClaimsFromToken(token, secret);
        return claimsResolver.apply(claims);
    }

    public String generateToken(AuthenticatedUser userDetails, String secret, Long expirationInSeconds) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", userDetails.getUsername());
        claims.put("name", userDetails.getName());
        claims.put("surname", userDetails.getSurname());
        claims.put("userId", userDetails.getUserId());
        claims.put("birthDate", userDetails.getBirthDate());
        claims.put("email", userDetails.getEmail());
        claims.put("phone", userDetails.getPhone());
        claims.put("authorities", userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")));
        claims.put("enabled", userDetails.isEnabled());
        claims.put("isAccountNonExpired", userDetails.isAccountNonExpired());
        claims.put("credentialsNonExpired", userDetails.isCredentialsNonExpired());
        claims.put("isAccountNonLocked", userDetails.isAccountNonLocked());
        return doGenerateToken(claims, userDetails.getUsername(), secret, expirationInSeconds);
    }

    public Boolean validateToken(String token, AuthenticatedUser userDetails, String secret) {
        final String username = getUsernameFromToken(token, secret);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token, secret));
    }

    public Boolean isTokenExpired(String token, String secret) {
        final Date expiration = getExpirationDateFromToken(token, secret);
        return expiration.before(new Date());
    }

    private Claims getAllClaimsFromToken(String token, String secret) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    private String doGenerateToken(Map<String, Object> claims, String subject, String secret, Long expirationInSeconds) {
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expirationInSeconds * 1000))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }
}
