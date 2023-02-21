import { LocationResponseDTO } from './LocationResponseDTO';

export class VehicleOptionsDTO {
    bodyTypes: string[];
    brands: string[];
    colors: string[];
    fuelTypes: string[];
    locations: LocationResponseDTO[];

    constructor(
        bodyTypes: string[],
        brands: string[],
        colours: string[],
        fuelTypes: string[],
        locations: LocationResponseDTO[]
    ) {
        this.bodyTypes = bodyTypes;
        this.brands = brands;
        this.colors = colours;
        this.fuelTypes = fuelTypes;
        this.locations = locations;
    }
}
