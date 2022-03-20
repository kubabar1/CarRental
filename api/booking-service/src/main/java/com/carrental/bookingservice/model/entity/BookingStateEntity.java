package com.carrental.bookingservice.model.entity;

import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import lombok.Data;


import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name = "booking_states")
@Table(name = "booking_states")
public class BookingStateEntity implements Serializable {

    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "booking_code", nullable = false, length = 3)
    private BookingStateCodeEnum bookingCode;

    @Column(name = "description", nullable = false, length = 50)
    private String description;
}
