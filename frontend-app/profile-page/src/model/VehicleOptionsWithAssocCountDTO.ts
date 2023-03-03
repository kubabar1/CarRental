import { AssocDetailsDTO } from './AssocDetailsDTO';
import { ModelAssocDetailsDTO } from './ModelAssocDetailsDTO';

export class VehicleOptionsWithAssocCountDTO {
    bodyTypes: AssocDetailsDTO[];
    brands: AssocDetailsDTO[];
    models: ModelAssocDetailsDTO[];
    colors: AssocDetailsDTO[];
    fuelTypes: AssocDetailsDTO[];

    constructor(
        bodyTypes: AssocDetailsDTO[],
        brands: AssocDetailsDTO[],
        models: ModelAssocDetailsDTO[],
        colors: AssocDetailsDTO[],
        fuelTypes: AssocDetailsDTO[]
    ) {
        this.bodyTypes = bodyTypes;
        this.brands = brands;
        this.models = models;
        this.colors = colors;
        this.fuelTypes = fuelTypes;
    }
}
