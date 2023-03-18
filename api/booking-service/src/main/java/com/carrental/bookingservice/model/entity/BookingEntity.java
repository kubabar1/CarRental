package com.carrental.bookingservice.model.entity;

import lombok.Data;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.hibernate.envers.RelationTargetAuditMode;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Audited
@Entity(name = "bookings")
@Table(name = "bookings")
public class BookingEntity implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "vehicle_id", nullable = false)
    private Long vehicleId;

    @Column(name = "receipt_date", nullable = false)
    private LocalDate receiptDate;

    @Column(name = "return_date", nullable = false)
    private LocalDate returnDate;

    @NotAudited
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id", referencedColumnName = "id", nullable = false)
    private LocationEntity location;

    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "booking_state_code", referencedColumnName = "booking_code", nullable = false)
    private BookingStateEntity bookingStateCode;

    @Column(name = "total_cost", nullable = false)
    private BigDecimal totalCost;
}
