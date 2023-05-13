package com.carrental.bookingservice.service.impl.validator;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import com.carrental.bookingservice.model.entity.BookingEntity;

public class BookingStateValidator {

    public void validateBookingStateDuringUpdate(BookingEntity bookingEntity, BookingStateCodeEnum newBookingState) throws BookingStateException {
        BookingStateCodeEnum currentBookingState = bookingEntity.getBookingStateCode().getBookingCode();
        if (currentBookingState.equals(BookingStateCodeEnum.RES) && !(newBookingState.equals(BookingStateCodeEnum.REN) || newBookingState.equals(BookingStateCodeEnum.CAN))) {
            throw new BookingStateException("After status 'RES' booking can be updated only to status 'REN' or 'CAN'");
        } else if (currentBookingState.equals(BookingStateCodeEnum.REN) && !newBookingState.equals(BookingStateCodeEnum.RET)) {
            throw new BookingStateException("After status 'REN' booking can be updated only to status 'RET'");
        } else if (currentBookingState.equals(BookingStateCodeEnum.RET)) {
            throw new BookingStateException("After status 'RET' booking status cannot be updated");
        } else if (currentBookingState.equals(BookingStateCodeEnum.CAN)) {
            throw new BookingStateException("After status 'CAN' booking status cannot be updated");
        }
    }
}
