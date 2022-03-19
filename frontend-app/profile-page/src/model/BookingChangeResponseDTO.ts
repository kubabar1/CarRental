export class BookingChangeResponseDTO {
    id: string;
    bookingId: string;
    userId: string;
    changeDate: string;
    ipAddress: string;

    constructor(id: string, bookingId: string, changeDate: string, userId: string, ipAddress: string) {
        this.id = id;
        this.bookingId = bookingId;
        this.changeDate = changeDate;
        this.userId = userId;
        this.ipAddress = ipAddress;
    }
}
