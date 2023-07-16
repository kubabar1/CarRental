package com.carrental.bookingservice.listener;

import com.carrental.bookingservice.model.dto.AvailableVehiclesSearchDTO;
import com.carrental.bookingservice.service.BookingUserService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

import java.util.Set;

public class BookingListener {

    private final BookingUserService bookingUserService;

    public BookingListener(BookingUserService bookingUserService) {
        this.bookingUserService = bookingUserService;
    }

    @RabbitListener(queues = {"getBookedVehiclesIdsQueue"})
    public Set<Long> getBookedVehiclesIdsListener(AvailableVehiclesSearchDTO availableVehiclesSearchDTO) {
        return bookingUserService.getBookedVehiclesIds(availableVehiclesSearchDTO);
    }
}
