package com.carrental.bookingservice.model.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class AvailableVehiclesSearchDTO implements Serializable {

    private Date receiptDate;

    private Date returnDate;
}
