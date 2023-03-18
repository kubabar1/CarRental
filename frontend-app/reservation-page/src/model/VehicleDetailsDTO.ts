export class VehicleDetailsDTO {
    bodyType: string;
    productionYear: number;
    fuelType: string;
    power: number;
    gearbox: string;
    frontWheelDrive: boolean;
    doorsNumber: number;
    seatsNumber: number;
    color: string;
    metallic: boolean;
    imageName: string;
    description: string;

    constructor(
        bodyType: string,
        productionYear: number,
        fuelType: string,
        power: number,
        gearbox: string,
        frontWheelDrive: boolean,
        doorsNumber: number,
        seatsNumber: number,
        color: string,
        metallic: boolean,
        imageName: string,
        description: string
    ) {
        this.bodyType = bodyType;
        this.productionYear = productionYear;
        this.fuelType = fuelType;
        this.power = power;
        this.gearbox = gearbox;
        this.frontWheelDrive = frontWheelDrive;
        this.doorsNumber = doorsNumber;
        this.seatsNumber = seatsNumber;
        this.color = color;
        this.metallic = metallic;
        this.imageName = imageName;
        this.description = description;
    }
}
