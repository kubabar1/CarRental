import { BookingResponseDTO } from '../model/BookingResponseDTO';
import { fetchGet, fetchPost } from './FetchUtil';
import {
    CANCEL_USER_BOOKING,
    GET_USER_BOOKINGS_PATH,
    GET_USER_BOOKINGS_RENTED_PATH,
    GET_USER_BOOKINGS_RESERVED_PATH,
} from '../constants/PathsAPI';
import Page from '../../../main-page/src/model/Page';
import { PAGE_REQUEST } from '../../../main-page/src/constants/PathsAPI';

export const getAuthenticatedUserBookingsList = (page?: number, size?: number): Promise<Page<BookingResponseDTO>> => {
    return fetchGet<Page<BookingResponseDTO>>(PAGE_REQUEST(GET_USER_BOOKINGS_PATH, page, size));
};

export const getAuthenticatedUserReservedBookingsList = (
    page?: number,
    size?: number
): Promise<Page<BookingResponseDTO>> => {
    return fetchGet<Page<BookingResponseDTO>>(PAGE_REQUEST(GET_USER_BOOKINGS_RESERVED_PATH, page, size));
};

export const getAuthenticatedUserRentedBookingsList = (
    page?: number,
    size?: number
): Promise<Page<BookingResponseDTO>> => {
    return fetchGet<Page<BookingResponseDTO>>(PAGE_REQUEST(GET_USER_BOOKINGS_RENTED_PATH, page, size));
};

export const cancelAuthorizedUserBooking = (bookingId: string): Promise<BookingResponseDTO> => {
    return fetchPost<BookingResponseDTO>(CANCEL_USER_BOOKING(bookingId));
};
