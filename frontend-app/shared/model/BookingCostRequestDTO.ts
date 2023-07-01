export class BookingCostRequestDTO {
    vehicleId: string;
    reservationDate: string;
    returnDate: string;

    constructor(vehicleId: string, reservationDate: string, returnDate: string) {
        this.vehicleId = vehicleId;
        this.reservationDate = reservationDate;
        this.returnDate = returnDate;
    }
}
