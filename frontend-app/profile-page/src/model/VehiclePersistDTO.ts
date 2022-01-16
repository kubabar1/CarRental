import { VehicleStatCodeEnum } from './VehicleStatCodeEnum';

export class VehiclePersistDTO {
    brand: string;
    model: string;
    dailyFee: number;
    registration: string;
    location: string;
    vehicleStatus: VehicleStatCodeEnum;
    bestOffer: boolean;
    bodyType: string;
    fuelType: string;
    power: number;
    gearbox: string;
    frontWheelDrive: boolean;
    doorsNumber: number;
    seatsNumber: number;
    color: string;
    metallic: boolean;
    description: string;
    productionYear: number;
    photoName: string;

    constructor(
        brand: string,
        model: string,
        dailyFee: number,
        registration: string,
        location: string,
        vehicleStatus: VehicleStatCodeEnum,
        bestOffer: boolean,
        bodyType: string,
        fuelType: string,
        power: number,
        gearbox: string,
        frontWheelDrive: boolean,
        doorsNumber: number,
        seatsNumber: number,
        color: string,
        metallic: boolean,
        description: string,
        productionYear: number,
        photoName: string
    ) {
        this.brand = brand;
        this.model = model;
        this.dailyFee = dailyFee;
        this.registration = registration;
        this.location = location;
        this.vehicleStatus = vehicleStatus;
        this.bestOffer = bestOffer;
        this.bodyType = bodyType;
        this.fuelType = fuelType;
        this.power = power;
        this.gearbox = gearbox;
        this.frontWheelDrive = frontWheelDrive;
        this.doorsNumber = doorsNumber;
        this.seatsNumber = seatsNumber;
        this.color = color;
        this.metallic = metallic;
        this.description = description;
        this.productionYear = productionYear;
        this.photoName = photoName;
    }
}
