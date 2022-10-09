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
import Page from '../../../main-page/src/model/Page';
import { PAGE_REQUEST } from '../../../main-page/src/constants/PathsAPI';

export const getAllBookingsList = (page?: number, size?: number): Promise<Page<BookingResponseDTO>> => {
    return fetchGet<Page<BookingResponseDTO>>(PAGE_REQUEST(GET_ADMIN_BOOKINGS_PATH, page, size));
};

export const getAllReservedBookingsList = (page?: number, size?: number): Promise<Page<BookingResponseDTO>> => {
    return fetchGet<Page<BookingResponseDTO>>(PAGE_REQUEST(GET_ADMIN_BOOKINGS_RESERVED_PATH, page, size));
};

export const getAllRentedBookingsList = (page?: number, size?: number): Promise<Page<BookingResponseDTO>> => {
    return fetchGet<Page<BookingResponseDTO>>(PAGE_REQUEST(GET_ADMIN_BOOKINGS_RENTED_PATH, page, size));
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
