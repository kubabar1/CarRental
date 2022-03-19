package com.carrental.bookingservice.exception;

public enum ErrorMessages {
    UNAUTHORIZED_USER("User with given ID is not authorized"),
    INCORRECT_NEW_BOOKING_STATUS("New booking status is incorrect");

    private String message;

    ErrorMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
