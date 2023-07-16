package com.carrental.vehicleservice.model.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class AvailableVehiclesSearchDTO implements Serializable {

    private Long locationId;

    private Date receiptDate;

    private Date returnDate;
}

