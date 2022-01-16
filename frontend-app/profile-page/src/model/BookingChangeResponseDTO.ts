export class BookingChangeResponseDTO {
    id: string;
    bookingId: string;
    changeDate: string;
    userLogin: string;
    ipAddress: string;

    constructor(id: string, bookingId: string, changeDate: string, userLogin: string, ipAddress: string) {
        this.id = id;
        this.bookingId = bookingId;
        this.changeDate = changeDate;
        this.userLogin = userLogin;
        this.ipAddress = ipAddress;
    }
}
