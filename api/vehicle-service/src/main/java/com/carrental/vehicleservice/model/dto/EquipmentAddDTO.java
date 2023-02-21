package com.carrental.vehicleservice.model.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class EquipmentAddDTO {

    @NotEmpty
    @Size(max = 3)
    String equipmentCode;

    @NotEmpty
    @Size(max = 50)
    String description;
}
