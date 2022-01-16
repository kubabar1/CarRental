import { VehicleStatCodeEnum } from './VehicleStatCodeEnum';

export class VehicleStatusResponseDTO {
    vehicleStatCode: VehicleStatCodeEnum;
    description: string;

    constructor(vehicleStatCode: VehicleStatCodeEnum, description: string) {
        this.vehicleStatCode = vehicleStatCode;
        this.description = description;
    }
}
