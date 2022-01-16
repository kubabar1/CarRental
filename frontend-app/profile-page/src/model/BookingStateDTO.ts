import { BookingStateCodeEnum } from './BookingStateCodeEnum';

export class BookingStateDTO {
    bookingCode: BookingStateCodeEnum;
    description: string;

    constructor(bookingCode: BookingStateCodeEnum, description: string) {
        this.bookingCode = bookingCode;
        this.description = description;
    }
}
