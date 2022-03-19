import { BookingResponseDTO } from '../model/BookingResponseDTO';
import { fetchGet, fetchPost } from './FetchUtil';
import {
    CANCEL_USER_BOOKING,
    GET_USER_BOOKINGS_PATH,
    GET_USER_BOOKINGS_RENTED_PATH,
    GET_USER_BOOKINGS_RESERVED_PATH,
} from '../constants/PathsAPI';

export const getAuthenticatedUserBookingsList = (): Promise<BookingResponseDTO[]> => {
    return fetchGet<BookingResponseDTO[]>(GET_USER_BOOKINGS_PATH);
};

export const getAuthenticatedUserReservedBookingsList = (): Promise<BookingResponseDTO[]> => {
    return fetchGet<BookingResponseDTO[]>(GET_USER_BOOKINGS_RESERVED_PATH);
};

export const getAuthenticatedUserRentedBookingsList = (): Promise<BookingResponseDTO[]> => {
    return fetchGet<BookingResponseDTO[]>(GET_USER_BOOKINGS_RENTED_PATH);
};

export const cancelAuthorizedUserBooking = (bookingId: string): Promise<BookingResponseDTO> => {
    return fetchPost<BookingResponseDTO>(CANCEL_USER_BOOKING(bookingId));
};
