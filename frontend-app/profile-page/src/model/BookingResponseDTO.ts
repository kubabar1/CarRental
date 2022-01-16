import { LocationResponseDTO } from './LocationResponseDTO';
import { BookingStateDTO } from './BookingStateDTO';

export class BookingResponseDTO {
    id: string;
    userId: string;
    vehicleId: string;
    receiptDate: Date;
    returnDate: Date;
    location: LocationResponseDTO;
    bookingState: BookingStateDTO;
    totalCost: number;

    constructor(
        id: string,
        userId: string,
        vehicleId: string,
        receiptDate: Date,
        returnDate: Date,
        location: LocationResponseDTO,
        bookingState: BookingStateDTO,
        totalCost: number
    ) {
        this.id = id;
        this.userId = userId;
        this.vehicleId = vehicleId;
        this.receiptDate = receiptDate;
        this.returnDate = returnDate;
        this.location = location;
        this.bookingState = bookingState;
        this.totalCost = totalCost;
    }
}
