import {
    BookingAddRequestDTO,
    BookingCostRequestDTO,
    BookingCostResponseDTO,
    BookingResponseDTO,
    Page,
    ResponseData,
} from '../model';
import { fetchGet, fetchPost, fetchPut } from './FetchUtil';
import {
    CANCEL_USER_BOOKING,
    DEFAULT_PAGE_INDEX,
    DEFAULT_PAGE_SIZE,
    endpoints,
    GET_USER_BOOKINGS_PATH,
    GET_USER_BOOKINGS_RENTED_PATH,
    GET_USER_BOOKINGS_RESERVED_PATH,
    PAGE_REQUEST,
} from '../constant/PathsAPI';

export class BookingUserService {
    static getBookingCost = (data: BookingCostRequestDTO): Promise<ResponseData<BookingCostResponseDTO>> => {
        return fetchPost<BookingCostResponseDTO>(endpoints.reservationCost, data);
    };

    static createBooking = (data: BookingAddRequestDTO): Promise<ResponseData<BookingResponseDTO>> => {
        return fetchPut<BookingResponseDTO>(endpoints.createBooking, data);
    };

    static getAuthenticatedUserBookingsList = (
        page: number = DEFAULT_PAGE_INDEX,
        size: number = DEFAULT_PAGE_SIZE,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<BookingResponseDTO>> => {
        return fetchGet<Page<BookingResponseDTO>>(
            PAGE_REQUEST(GET_USER_BOOKINGS_PATH, page, size, filter, sortBy, desc)
        );
    };

    static cancelAuthorizedUserBooking = (bookingId: string): Promise<ResponseData<BookingResponseDTO>> => {
        return fetchPost<BookingResponseDTO>(CANCEL_USER_BOOKING(bookingId));
    };

    static getAuthenticatedUserReservedBookingsList = (
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

    static getAuthenticatedUserRentedBookingsList = (
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
}
