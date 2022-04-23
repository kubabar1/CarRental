package com.carrental.bookingservice.exception;

public enum ErrorMessages {
    INCORRECT_NEW_BOOKING_STATUS("New booking status is incorrect");

    private String message;

    ErrorMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
