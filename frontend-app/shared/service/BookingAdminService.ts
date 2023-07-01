import { BookingResponseDTO, Page, BookingStateDTO, ResponseData } from '../model';
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
import { fetchGet, fetchPost } from './FetchUtil';

export class BookingAdminService {
    static getAllBookingsList = (
        page?: number,
        size?: number,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<BookingResponseDTO>> => {
        return fetchGet<Page<BookingResponseDTO>>(
            PAGE_REQUEST(GET_ADMIN_BOOKINGS_PATH, page, size, filter, sortBy, desc)
        );
    };

    static getAllReservedBookingsList = (
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

    static getAllRentedBookingsList = (
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

    static rentBooking = (bookingId: string): Promise<ResponseData<BookingResponseDTO>> => {
        return fetchPost<BookingResponseDTO>(RENT_ADMIN_BOOKING(bookingId));
    };

    static cancelBooking = (bookingId: string): Promise<ResponseData<BookingResponseDTO>> => {
        return fetchPost<BookingResponseDTO>(CANCEL_ADMIN_BOOKING(bookingId));
    };

    static returnBooking = (bookingId: string): Promise<ResponseData<BookingResponseDTO>> => {
        return fetchPost<BookingResponseDTO>(RETURN_ADMIN_BOOKING(bookingId));
    };

    static getAllBookingStates = (): Promise<BookingStateDTO[]> => {
        return fetchGet<BookingStateDTO[]>(BOOKING_STATES);
    };
}
