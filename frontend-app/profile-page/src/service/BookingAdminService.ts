import { BookingResponseDTO } from '../model/BookingResponseDTO';
import {
    CANCEL_ADMIN_BOOKING,
    GET_ADMIN_BOOKINGS_PATH,
    GET_ADMIN_BOOKINGS_RENTED_PATH,
    GET_ADMIN_BOOKINGS_RESERVED_PATH,
    RENT_ADMIN_BOOKING,
    RETURN_ADMIN_BOOKING,
} from '../constants/PathsAPI';
import { fetchGet, fetchPost } from './FetchUtil';

export const getAllBookingsList = (): Promise<BookingResponseDTO[]> => {
    return fetchGet<BookingResponseDTO[]>(GET_ADMIN_BOOKINGS_PATH);
};

export const getAllReservedBookingsList = (): Promise<BookingResponseDTO[]> => {
    return fetchGet<BookingResponseDTO[]>(GET_ADMIN_BOOKINGS_RESERVED_PATH);
};

export const getAllRentedBookingsList = (): Promise<BookingResponseDTO[]> => {
    return fetchGet<BookingResponseDTO[]>(GET_ADMIN_BOOKINGS_RENTED_PATH);
};

export const rentBooking = (bookingId: string): Promise<BookingResponseDTO> => {
    return fetchPost<BookingResponseDTO>(RENT_ADMIN_BOOKING(bookingId));
};

export const cancelBooking = (bookingId: string): Promise<BookingResponseDTO> => {
    return fetchPost<BookingResponseDTO>(CANCEL_ADMIN_BOOKING(bookingId));
};

export const returnBooking = (bookingId: string): Promise<BookingResponseDTO> => {
    return fetchPost<BookingResponseDTO>(RETURN_ADMIN_BOOKING(bookingId));
};
