package com.carrental.vehicleservice.model.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class EquipmentPersistDTO {

    @NotEmpty
    String equipmentCode;
}
