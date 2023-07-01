import { VehicleStatusResponseDTO } from './VehicleStatusResponseDTO';
import { VehicleDetailsDTO } from './VehicleDetailsDTO';
import { EquipmentResponseDTO } from './EquipmentResponseDTO';
import { LocalisationResponseDTO } from './LocalisationResponseDTO';

export class VehicleResponseDTO {
    id: string;
    registration: string;
    brand: string;
    model: string;
    averageRate: number;
    dailyFee: number;
    location: LocalisationResponseDTO;
    bestOffer: boolean;
    vehicleStatus: VehicleStatusResponseDTO;
    vehicleDetails: VehicleDetailsDTO;
    equipments: EquipmentResponseDTO[];

    constructor(
        id: string,
        brand: string,
        model: string,
        averageRate: number,
        dailyFee: number,
        registration: string,
        location: LocalisationResponseDTO,
        bestOffer: boolean,
        vehicleStatus: VehicleStatusResponseDTO,
        vehicleDetails: VehicleDetailsDTO,
        equipments: EquipmentResponseDTO[]
    ) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.averageRate = averageRate;
        this.dailyFee = dailyFee;
        this.registration = registration;
        this.location = location;
        this.bestOffer = bestOffer;
        this.vehicleStatus = vehicleStatus;
        this.vehicleDetails = vehicleDetails;
        this.equipments = equipments;
    }
}
