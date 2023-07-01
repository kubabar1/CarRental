export class BookingAuditLogResponseDTO {
    id: string;
    bookingId: string;
    receiptDate: string;
    returnDate: string;
    totalCost: number;
    userId: string;
    vehicleId: string;
    bookingCode: string;

    constructor(
        id: string,
        bookingId: string,
        receiptDate: string,
        returnDate: string,
        totalCost: number,
        userId: string,
        vehicleId: string,
        bookingCode: string
    ) {
        this.id = id;
        this.bookingId = bookingId;
        this.receiptDate = receiptDate;
        this.returnDate = returnDate;
        this.totalCost = totalCost;
        this.userId = userId;
        this.vehicleId = vehicleId;
        this.bookingCode = bookingCode;
    }
}
