package com.carrental.repository;

import com.carrental.exception.BookingUnavailableVehicleException;
import com.carrental.model.entity.Booking;
import com.carrental.model.entity.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Repository
public class BookingRepositoryImpl implements BookingRepositoryCustom {

  @PersistenceContext private EntityManager entityManager;

  @Autowired private VehicleRepository vehicleRepository;

  @Autowired private BookingRepository bookingRepository;

  @Override
  @Transactional
  public void addBooking(Booking booking) throws BookingUnavailableVehicleException {
    Vehicle reservedVehicle = vehicleRepository.getVehicleUsingId(booking.getVehicleId());

    if (reservedVehicle.getVehicleStatus() == "UAV") {
      throw new BookingUnavailableVehicleException("Cannot book unavailable vehicle.");
    } else {
      reservedVehicle.setVehicleStatus("UAV");

      entityManager.merge(reservedVehicle);

      entityManager.persist(booking);
    }
  }

  @Override
  @Transactional
  public void cancelBooking(Long bookingId) {
    Booking booking = bookingRepository.getBookingsById(bookingId);

    Vehicle reservedVehicle = vehicleRepository.getVehicleUsingId(booking.getVehicleId());

    reservedVehicle.setVehicleStatus("AVI");

    booking.setBookingStateCode("CAN");

    entityManager.merge(booking);

    entityManager.merge(reservedVehicle);
  }

  @Override
  @Transactional
  public void bookingRent(Long bookingId) {
    Booking booking = bookingRepository.getBookingsById(bookingId);

    booking.setBookingStateCode("REN");

    entityManager.merge(booking);
  }

  @Override
  @Transactional
  public void bookingReturn(Long bookingId) {
    Booking booking = bookingRepository.getBookingsById(bookingId);

    Vehicle reservedVehicle = vehicleRepository.getVehicleUsingId(booking.getVehicleId());

    reservedVehicle.setVehicleStatus("AVI");

    booking.setBookingStateCode("RET");

    entityManager.merge(booking);

    entityManager.merge(reservedVehicle);
  }
}
