package com.carrental.authservice.exceptions;

public class VerificationTokenException extends RuntimeException {

    public VerificationTokenException() {
        super();
    }

    public VerificationTokenException(String message) {
        super(message);
    }

    public VerificationTokenException(String message, Throwable cause) {
        super(message, cause);
    }

    public VerificationTokenException(Throwable cause) {
        super(cause);
    }

    protected VerificationTokenException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
