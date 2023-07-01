import { BookingResponseDTO, Page } from '../model';
import { fetchGet, fetchPost, ResponseData } from './FetchUtil';
import {
    CANCEL_USER_BOOKING,
    DEFAULT_PAGE_INDEX,
    DEFAULT_PAGE_SIZE,
    GET_USER_BOOKINGS_PATH,
    GET_USER_BOOKINGS_RENTED_PATH,
    GET_USER_BOOKINGS_RESERVED_PATH,
    PAGE_REQUEST,
} from '../constant/PathsAPI';

export const getAuthenticatedUserBookingsList = (
    page: number = DEFAULT_PAGE_INDEX,
    size: number = DEFAULT_PAGE_SIZE,
    filter?: string,
    sortBy?: string,
    desc?: boolean
): Promise<Page<BookingResponseDTO>> => {
    return fetchGet<Page<BookingResponseDTO>>(PAGE_REQUEST(GET_USER_BOOKINGS_PATH, page, size, filter, sortBy, desc));
};

export const getAuthenticatedUserReservedBookingsList = (
    page?: number,
    size?: number,
    filter?: string,
    sortBy?: string,
    desc?: boolean
): Promise<Page<BookingResponseDTO>> => {
    return fetchGet<Page<BookingResponseDTO>>(
        PAGE_REQUEST(GET_USER_BOOKINGS_RESERVED_PATH, page, size, filter, sortBy, desc)
    );
};

export const getAuthenticatedUserRentedBookingsList = (
    page?: number,
    size?: number,
    filter?: string,
    sortBy?: string,
    desc?: boolean
): Promise<Page<BookingResponseDTO>> => {
    return fetchGet<Page<BookingResponseDTO>>(
        PAGE_REQUEST(GET_USER_BOOKINGS_RENTED_PATH, page, size, filter, sortBy, desc)
    );
};

export const cancelAuthorizedUserBooking = (bookingId: string): Promise<ResponseData<BookingResponseDTO>> => {
    return fetchPost<BookingResponseDTO>(CANCEL_USER_BOOKING(bookingId));
};
