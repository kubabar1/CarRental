import { BookingResponseDTO, Page, BookingStateDTO } from '../model';
import {
    BOOKING_STATES,
    CANCEL_ADMIN_BOOKING,
    DEFAULT_PAGE_INDEX,
    DEFAULT_PAGE_SIZE,
    GET_ADMIN_BOOKINGS_PATH,
    GET_ADMIN_BOOKINGS_RENTED_PATH,
    GET_ADMIN_BOOKINGS_RESERVED_PATH,
    PAGE_REQUEST,
    RENT_ADMIN_BOOKING,
    RETURN_ADMIN_BOOKING,
} from '../constant/PathsAPI';
import { fetchGet, fetchPost, ResponseData } from './FetchUtil';

export const getAllBookingsList = (
    page?: number,
    size?: number,
    filter?: string,
    sortBy?: string,
    desc?: boolean
): Promise<Page<BookingResponseDTO>> => {
    return fetchGet<Page<BookingResponseDTO>>(PAGE_REQUEST(GET_ADMIN_BOOKINGS_PATH, page, size, filter, sortBy, desc));
};

export const getAllReservedBookingsList = (
    page: number = DEFAULT_PAGE_INDEX,
    size: number = DEFAULT_PAGE_SIZE,
    filter?: string,
    sortBy?: string,
    desc?: boolean
): Promise<Page<BookingResponseDTO>> => {
    return fetchGet<Page<BookingResponseDTO>>(
        PAGE_REQUEST(GET_ADMIN_BOOKINGS_RESERVED_PATH, page, size, filter, sortBy, desc)
    );
};

export const getAllRentedBookingsList = (
    page: number = DEFAULT_PAGE_INDEX,
    size: number = DEFAULT_PAGE_SIZE,
    filter?: string,
    sortBy?: string,
    desc?: boolean
): Promise<Page<BookingResponseDTO>> => {
    return fetchGet<Page<BookingResponseDTO>>(
        PAGE_REQUEST(GET_ADMIN_BOOKINGS_RENTED_PATH, page, size, filter, sortBy, desc)
    );
};

export const rentBooking = (bookingId: string): Promise<ResponseData<BookingResponseDTO>> => {
    return fetchPost<BookingResponseDTO>(RENT_ADMIN_BOOKING(bookingId));
};

export const cancelBooking = (bookingId: string): Promise<ResponseData<BookingResponseDTO>> => {
    return fetchPost<BookingResponseDTO>(CANCEL_ADMIN_BOOKING(bookingId));
};

export const returnBooking = (bookingId: string): Promise<ResponseData<BookingResponseDTO>> => {
    return fetchPost<BookingResponseDTO>(RETURN_ADMIN_BOOKING(bookingId));
};

export const getAllBookingStates = (): Promise<BookingStateDTO[]> => {
    return fetchGet<BookingStateDTO[]>(BOOKING_STATES);
};
