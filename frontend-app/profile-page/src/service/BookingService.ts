import { BookingResponseDTO } from '../model/BookingResponseDTO';
import { LocationResponseDTO } from '../model/LocationResponseDTO';
import { BookingStateDTO } from '../model/BookingStateDTO';
import { BookingStateCodeEnum } from '../model/BookingStateCodeEnum';
import { BookingChangeResponseDTO } from '../model/BookingChangeResponseDTO';

const bookings = [
    new BookingResponseDTO(
        '1',
        '1',
        '1',
        new Date('Jul 19, 2021'),
        new Date('Jul 21, 2021'),
        new LocationResponseDTO('1', 'Poland', 'Warszawa', 'ul. Testowa 12/2', 'test1@test.com', '12345'),
        new BookingStateDTO(BookingStateCodeEnum.RES, 'Reserved'),
        1324.21
    ),
    new BookingResponseDTO(
        '2',
        '3',
        '4',
        new Date('Jan 1, 2022'),
        new Date('Jan 12, 2022'),
        new LocationResponseDTO('2', 'Poland', 'Kraków', 'ul. Testowa 15/3', 'test2@test.com', '67891'),
        new BookingStateDTO(BookingStateCodeEnum.CAN, 'Cancelled'),
        4123.33
    ),
    new BookingResponseDTO(
        '3',
        '5',
        '3',
        new Date('Nov 21, 2021'),
        new Date('Nov 24, 2021'),
        new LocationResponseDTO('3', 'Poland', 'Wrocław', 'ul. Testowa 22/12', 'test3@test.com', '23456'),
        new BookingStateDTO(BookingStateCodeEnum.RET, 'Returned'),
        213.54
    ),
    new BookingResponseDTO(
        '4',
        '5',
        '12',
        new Date('Dec 12, 2021'),
        new Date('Dec 14, 2021'),
        new LocationResponseDTO('3', 'Poland', 'Wrocław', 'ul. Testowa 22/12', 'test3@test.com', '23456'),
        new BookingStateDTO(BookingStateCodeEnum.RES, 'Reserved'),
        123.22
    ),
    new BookingResponseDTO(
        '5',
        '1',
        '121',
        new Date('Jul 19, 2021'),
        new Date('Jul 21, 2021'),
        new LocationResponseDTO('1', 'Poland', 'Warszawa', 'ul. Testowa 12/2', 'test1@test.com', '12345'),
        new BookingStateDTO(BookingStateCodeEnum.RES, 'Reserved'),
        1324.21
    ),
    new BookingResponseDTO(
        '6',
        '1',
        '121',
        new Date('Jul 12, 2021'),
        new Date('Jul 16, 2021'),
        new LocationResponseDTO('1', 'Poland', 'Warszawa', 'ul. Testowa 12/2', 'test1@test.com', '12345'),
        new BookingStateDTO(BookingStateCodeEnum.REN, 'Rented'),
        1312.99
    ),
    new BookingResponseDTO(
        '7',
        '1',
        '121',
        new Date('Jul 16, 2021'),
        new Date('Jul 17, 2021'),
        new LocationResponseDTO('1', 'Poland', 'Warszawa', 'ul. Testowa 12/2', 'test1@test.com', '12345'),
        new BookingStateDTO(BookingStateCodeEnum.REN, 'Rented'),
        134.21
    ),
];

export const getBookingsList = (): Promise<BookingResponseDTO[]> => {
    return Promise.all(bookings);
};

export const getReservedBookingsList = (): Promise<BookingResponseDTO[]> => {
    return Promise.all(
        bookings.filter((booking: BookingResponseDTO) => booking.bookingState.bookingCode === BookingStateCodeEnum.RES)
    );
};

export const getRentedBookingsList = (): Promise<BookingResponseDTO[]> => {
    return Promise.all(
        bookings.filter((booking: BookingResponseDTO) => booking.bookingState.bookingCode === BookingStateCodeEnum.REN)
    );
};

export const getCurrentUserBookingsList = (userId: string): Promise<BookingResponseDTO[]> => {
    return Promise.all(bookings.filter((booking: BookingResponseDTO) => booking.userId === userId));
};

export const getCurrentUserReservedBookingsList = (userId: string): Promise<BookingResponseDTO[]> => {
    return Promise.all(
        bookings.filter(
            (booking: BookingResponseDTO) =>
                booking.bookingState.bookingCode === BookingStateCodeEnum.RES && booking.userId === userId
        )
    );
};

export const getCurrentUserRentedBookingsList = (userId: string): Promise<BookingResponseDTO[]> => {
    return Promise.all(
        bookings.filter(
            (booking: BookingResponseDTO) =>
                booking.bookingState.bookingCode === BookingStateCodeEnum.REN && booking.userId === userId
        )
    );
};

export const getBookingChangesList = (): Promise<BookingChangeResponseDTO[]> => {
    return Promise.all([
        new BookingChangeResponseDTO('1', '1', '21-02-2021', 'adam123', '000.000.0.0.0'),
        new BookingChangeResponseDTO('2', '1', '22-02-2021', 'jan123', '000.000.0.0.0'),
        new BookingChangeResponseDTO('3', '2', '21-02-2021', 'adam123', '000.000.0.0.0'),
    ]);
};

export const rentBooking = (bookingId: string): Promise<void> => {
    return new Promise<void>(() => {
        const booking: BookingResponseDTO | undefined = bookings.find(
            (booking: BookingResponseDTO) => booking.id === bookingId
        );
        if (booking) {
            booking.bookingState = new BookingStateDTO(BookingStateCodeEnum.REN, 'Rented');
            console.log(`Rented booking "${bookingId}"`);
        }
    });
};

export const cancelBooking = (bookingId: string): Promise<void> => {
    return new Promise<void>(() => {
        const booking: BookingResponseDTO | undefined = bookings.find(
            (booking: BookingResponseDTO) => booking.id === bookingId
        );
        if (booking) {
            booking.bookingState = new BookingStateDTO(BookingStateCodeEnum.CAN, 'Cancelled');
            console.log(`Cancelled booking "${bookingId}"`);
        }
    });
};

export const cancelCurrentUserBooking = (bookingId: string): Promise<void> => {
    return new Promise<void>(() => {
        const booking: BookingResponseDTO | undefined = bookings.find(
            (booking: BookingResponseDTO) => booking.id === bookingId
        );
        if (booking) {
            booking.bookingState = new BookingStateDTO(BookingStateCodeEnum.CAN, 'Cancelled');
            console.log(`Cancelled booking "${bookingId}"`);
        }
    });
};

export const returnBooking = (bookingId: string): Promise<void> => {
    return new Promise<void>(() => {
        const booking: BookingResponseDTO | undefined = bookings.find(
            (booking: BookingResponseDTO) => booking.id === bookingId
        );
        if (booking) {
            booking.bookingState = new BookingStateDTO(BookingStateCodeEnum.RET, 'Returned');
            console.log(`Returned booking "${bookingId}"`);
        }
    });
};
