import LocalisationResponseDTO from './LocalisationResponseDTO';
import VehicleStatusResponseDTO from './VehicleStatusResponseDTO';
import VehicleParametersResponseDTO from './VehicleParametersResponseDTO';

class VehicleResponseDTO {
    id: number;
    registration: string;
    brand: string;
    model: string;
    dailyFee: number;
    location: LocalisationResponseDTO;
    vehicleStatus: VehicleStatusResponseDTO;
    vehicleParameters: VehicleParametersResponseDTO;
    bestOffer: boolean;

    constructor(
        id: number,
        registration: string,
        brand: string,
        model: string,
        dailyFee: number,
        location: LocalisationResponseDTO,
        vehicleStatus: VehicleStatusResponseDTO,
        vehicleParameters: VehicleParametersResponseDTO,
        bestOffer: boolean
    ) {
        this.id = id;
        this.registration = registration;
        this.brand = brand;
        this.model = model;
        this.dailyFee = dailyFee;
        this.location = location;
        this.vehicleStatus = vehicleStatus;
        this.vehicleParameters = vehicleParameters;
        this.bestOffer = bestOffer;
    }
}

export default VehicleResponseDTO;
