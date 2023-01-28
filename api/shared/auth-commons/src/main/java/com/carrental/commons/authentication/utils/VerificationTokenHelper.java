package com.carrental.commons.authentication.utils;

import com.carrental.commons.authentication.model.VerificationTokenDTO;

import java.util.Date;

public class VerificationTokenHelper {

    public static boolean isTokenValid(VerificationTokenDTO verificationToken) {
        return verificationToken != null
                && verificationToken.getUserId() != null
                && verificationToken.getToken() != null
                && !isTokenExpired(verificationToken.getExpiryDate());
    }

    public static boolean isTokenExpired(Date verificationTokenExpiryDate) {
        return new Date().after(verificationTokenExpiryDate);
    }
}
