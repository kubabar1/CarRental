import { VehicleStatusResponseDTO } from './VehicleStatusResponseDTO';
import { VehicleDetailsDTO } from './VehicleDetailsDTO';
import { EquipmentResponseDTO } from './EquipmentResponseDTO';

export class VehicleResponseDTO {
    id: string;
    registration: string;
    brand: string;
    model: string;
    averageRate: number;
    dailyFee: number;
    locationId: string;
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
        locationId: string,
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
        this.locationId = locationId;
        this.bestOffer = bestOffer;
        this.vehicleStatus = vehicleStatus;
        this.vehicleDetails = vehicleDetails;
        this.equipments = equipments;
    }
}
