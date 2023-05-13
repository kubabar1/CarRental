package com.carrental.bookingservice.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity(name = "bookings_aud")
@Table(name = "bookings_aud")
public class BookingAuditLogEntity {

    @Id
    @Column(name = "rev", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "id", nullable = false)
    private Long bookingId;

    @Column(name = "revtype", nullable = false)
    private Long revtype;

    @Column(name = "receipt_date", nullable = false)
    private LocalDate receiptDate;

    @Column(name = "return_date", nullable = false)
    private LocalDate returnDate;

    @Column(name = "total_cost", nullable = false)
    private BigDecimal totalCost;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "vehicle_id", nullable = false)
    private Long vehicleId;

    @Column(name = "booking_state_code", nullable = false)
    private String bookingStateCode;
}
