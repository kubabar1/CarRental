import LocalisationResponseDTO from './LocalisationResponseDTO';

export class LocalisationsResponseDTO {
    locations: LocalisationResponseDTO[];

    constructor(locations: LocalisationResponseDTO[]) {
        this.locations = locations;
    }
}
