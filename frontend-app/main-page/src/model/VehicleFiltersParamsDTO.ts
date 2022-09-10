export class VehicleFiltersParamsDTO {
    bodyTypes: string[];
    brands: string[];
    cities: string[];
    colors: string[];
    minDoorCount: number;
    maxDoorCount: number;
    minPrice: number;
    maxPrice: number;
    minProductionYear: number;
    maxProductionYear: number;
    minSeatsCount: number;
    maxSeatsCount: number;

    constructor(
        bodyTypes: string[],
        brands: string[],
        cities: string[],
        colours: string[],
        minDoorCount: number,
        maxDoorCount: number,
        minPrice: number,
        maxPrice: number,
        minProductionYear: number,
        maxProductionYear: number,
        minSeatsCount: number,
        maxSeatsCount: number
    ) {
        this.bodyTypes = bodyTypes;
        this.brands = brands;
        this.cities = cities;
        this.colors = colours;
        this.minDoorCount = minDoorCount;
        this.maxDoorCount = maxDoorCount;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.minProductionYear = minProductionYear;
        this.maxProductionYear = maxProductionYear;
        this.minSeatsCount = minSeatsCount;
        this.maxSeatsCount = maxSeatsCount;
    }
}
