export class AvailableVehiclesSearchDTO {
    locationId: string;
    receiptDate: string;
    returnDate: string;

    constructor(locationId: string, receiptDate: string, returnDate: string) {
        this.locationId = locationId;
        this.receiptDate = receiptDate;
        this.returnDate = returnDate;
    }
}
