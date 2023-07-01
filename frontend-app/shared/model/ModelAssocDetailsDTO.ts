import { AssocDetailsDTO } from './AssocDetailsDTO';

export class ModelAssocDetailsDTO extends AssocDetailsDTO {
    brand: string;

    constructor(name: string, brand: string, count: number) {
        super(name, count);
        this.brand = brand;
    }
}
