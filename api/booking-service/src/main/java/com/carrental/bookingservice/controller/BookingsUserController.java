package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.dto.*;
import com.carrental.bookingservice.service.BookingUserService;
import com.carrental.commons.authentication.exception.AuthorizationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@RequestMapping(value = "/user/bookings")
public class BookingsUserController implements BookingsController {

    private final BookingUserService bookingUserService;

    public BookingsUserController(BookingUserService bookingUserService) {
        this.bookingUserService = bookingUserService;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/cost")
    public ResponseEntity<BookingCostResponseDTO> calculateBookingCostController(@Valid @RequestBody BookingCostRequestDTO bookingCostRequestDTO) {
        return ResponseEntity.ok().body(bookingUserService.calculateBookingCost(bookingCostRequestDTO));
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping
    public ResponseEntity<BookingResponseDTO> createNewBookingController(@Valid @RequestBody BookingAddRequestDTO bookingAddRequestDTO) {
        try {
            BookingResponseDTO bookingResponseDTO = bookingUserService.addNewBooking(bookingAddRequestDTO);
            return ResponseEntity.ok().body(bookingResponseDTO);
        } catch (NoSuchElementException | BookingStateException exception) {
            return ResponseEntity.badRequest().build();
        } catch (AuthorizationException exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<BookingResponseDTO>> getBookingsController(
            Pageable pageable,
            @RequestParam(value = "filter", required = false) String filter) {
        return ResponseEntity.ok().body(bookingUserService.getBookings(pageable, filter));
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BookingResponseDTO> getBookingByIdController(Long bookingId) {
        try {
            BookingResponseDTO bookingResponseDTO = bookingUserService.getBookingById(bookingId);
            return ResponseEntity.ok().body(bookingResponseDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<BookingResponseDTO>> getReservedBookingsController(
            Pageable pageable,
            @RequestParam(value = "filter", required = false) String filterString
    ) {
        return ResponseEntity.ok().body(bookingUserService.getReservedBookings(pageable, filterString));
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<BookingResponseDTO>> getRentedBookingsController(
            Pageable pageable,
            @RequestParam(value = "filter", required = false) String filterString
    ) {
        return ResponseEntity.ok().body(bookingUserService.getRentedBookings(pageable, filterString));
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BookingResponseDTO> cancelBookingController(Long bookingId) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(bookingUserService.cancelBooking(bookingId));
        } catch (NoSuchElementException exception) {
            return ResponseEntity.notFound().build();
        } catch (BookingStateException exception) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/states")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Set<BookingStateDTO>> getAllBookingStatesController() {
        return ResponseEntity.status(HttpStatus.OK).body(bookingUserService.getBookingStates());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = ex.getBindingResult().getAllErrors().stream()
                .collect(Collectors.toMap(
                        e -> e instanceof FieldError ? ((FieldError) e).getField() : "",
                        e -> e.getDefaultMessage() == null ? "" : e.getDefaultMessage())
                );
        return ResponseEntity.badRequest().body(errors);
    }
}
