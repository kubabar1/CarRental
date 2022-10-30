package com.carrental.authservice.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

@Data
@Entity(name = "verification_token")
@Table(name = "verification_token")
public class VerificationToken {

    public static final int VERIFICATION_TOKEN_EXPIRATION_SEC = 60 * 60 * 24;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "token", nullable = false, length = 255)
    private String token;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "expiry_date", nullable = false)
    private Date expiryDate;

    public Date calculateExpiryDate(int expiryTimeInSeconds) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Timestamp(calendar.getTime().getTime()));
        calendar.add(Calendar.SECOND, expiryTimeInSeconds);
        return new Date(calendar.getTime().getTime());
    }
}
