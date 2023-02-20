export class VehicleOptionsDTO {
    bodyTypes: string[];
    brands: string[];
    cities: string[];
    colors: string[];

    constructor(bodyTypes: string[], brands: string[], cities: string[], colours: string[]) {
        this.bodyTypes = bodyTypes;
        this.brands = brands;
        this.cities = cities;
        this.colors = colours;
    }
}
