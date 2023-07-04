import { LocalisationResponseDTO } from '../model';

export class VehicleOptionsDTO {
    bodyTypes: string[];
    brands: string[];
    colors: string[];
    cities: string[];
    fuelTypes: string[];
    locations: LocalisationResponseDTO[];

    constructor(
        bodyTypes: string[],
        brands: string[],
        colors: string[],
        cities: string[],
        fuelTypes: string[],
        locations: LocalisationResponseDTO[]
    ) {
        this.bodyTypes = bodyTypes;
        this.brands = brands;
        this.colors = colors;
        this.cities = cities;
        this.fuelTypes = fuelTypes;
        this.locations = locations;
    }
}