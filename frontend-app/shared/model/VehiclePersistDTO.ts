import { VehicleDetailsDTO } from './VehicleDetailsDTO';

export class VehiclePersistDTO {
    registration: string;
    brand: string;
    model: string;
    dailyFee: number;
    locationId: string;
    bestOffer: boolean;
    vehicleDetailsDTO: VehicleDetailsDTO;

    constructor(
        registration: string,
        brand: string,
        model: string,
        dailyFee: number,
        locationId: string,
        bestOffer: boolean,
        vehicleDetails: VehicleDetailsDTO
    ) {
        this.brand = brand;
        this.model = model;
        this.dailyFee = dailyFee;
        this.registration = registration;
        this.locationId = locationId;
        this.bestOffer = bestOffer;
        this.vehicleDetailsDTO = vehicleDetails;
    }
}
