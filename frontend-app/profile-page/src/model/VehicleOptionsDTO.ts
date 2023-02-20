import LocalisationResponseDTO from '../../../main-page/src/model/LocalisationResponseDTO';

export class VehicleOptionsDTO {
    bodyTypes: string[];
    brands: string[];
    colors: string[];
    fuelTypes: string[];
    locations: LocalisationResponseDTO[];

    constructor(
        bodyTypes: string[],
        brands: string[],
        colours: string[],
        fuelTypes: string[],
        locations: LocalisationResponseDTO[]
    ) {
        this.bodyTypes = bodyTypes;
        this.brands = brands;
        this.colors = colours;
        this.fuelTypes = fuelTypes;
        this.locations = locations;
    }
}
