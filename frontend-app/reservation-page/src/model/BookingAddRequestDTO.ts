class BookingAddRequestDTO {
    locationId: number;
    vehicleId: number;
    receiptDate: string;
    returnDate: string;

    constructor(locationId: number, vehicleId: number, receiptDate: string, returnDate: string) {
        this.locationId = locationId;
        this.vehicleId = vehicleId;
        this.receiptDate = receiptDate;
        this.returnDate = returnDate;
    }
}

export default BookingAddRequestDTO;
