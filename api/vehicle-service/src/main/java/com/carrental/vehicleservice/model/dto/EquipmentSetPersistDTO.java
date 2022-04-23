package com.carrental.vehicleservice.model.dto;

import lombok.Data;

import java.util.Set;

@Data
public class EquipmentSetPersistDTO {

    private Set<EquipmentPersistDTO> equipments;

}
