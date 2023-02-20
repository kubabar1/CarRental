import { VehicleStatCodeEnum } from './VehicleStatCodeEnum';
import { VehicleDetailsDTO } from './VehicleDetailsDTO';

export class VehiclePersistDTO {
    registration: string;
    brand: string;
    model: string;
    dailyFee: number;
    locationId: number;
    bestOffer: boolean;
    vehicleStatus: VehicleStatCodeEnum;
    vehicleDetailsDTO: VehicleDetailsDTO;

    constructor(
        registration: string,
        brand: string,
        model: string,
        dailyFee: number,
        locationId: number,
        bestOffer: boolean,
        vehicleStatus: VehicleStatCodeEnum,
        vehicleDetails: VehicleDetailsDTO
    ) {
        this.brand = brand;
        this.model = model;
        this.dailyFee = dailyFee;
        this.registration = registration;
        this.locationId = locationId;
        this.vehicleStatus = vehicleStatus;
        this.bestOffer = bestOffer;
        this.vehicleDetailsDTO = vehicleDetails;
    }
}
