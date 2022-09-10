export class VehicleFiltersState {
    brand?: string;
    model?: string;
    city?: string;
    bodyType?: string;
    minPrice?: number;
    maxPrice?: number;
    minSeatsCount?: number;
    maxSeatsCount?: number;
    minDoorsCount?: number;
    maxDoorsCount?: number;
    minProductionYear?: number;
    maxProductionYear?: number;
    color?: string;

    constructor() {
        this.brand = undefined;
        this.model = undefined;
        this.city = undefined;
        this.bodyType = undefined;
        this.minPrice = undefined;
        this.maxPrice = undefined;
        this.minSeatsCount = undefined;
        this.maxSeatsCount = undefined;
        this.minDoorsCount = undefined;
        this.maxDoorsCount = undefined;
        this.minProductionYear = undefined;
        this.maxProductionYear = undefined;
        this.color = undefined;
    }
}
