package com.carrental.bookingservice.exception;

public class BookingStateException extends RuntimeException {

    public BookingStateException() {
        super();
    }

    public BookingStateException(String message) {
        super(String.format("%s: %s", ErrorMessages.INCORRECT_NEW_BOOKING_STATUS.getMessage(), message));
    }

    public BookingStateException(String message, Throwable cause) {
        super(String.format("%s: %s", ErrorMessages.INCORRECT_NEW_BOOKING_STATUS.getMessage(), message), cause);
    }

    public BookingStateException(Throwable cause) {
        super(cause);
    }

    protected BookingStateException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(String.format("%s: %s", ErrorMessages.INCORRECT_NEW_BOOKING_STATUS.getMessage(), message), cause,
                enableSuppression, writableStackTrace);
    }
}
