import {
    BookingAddRequestDTO,
    BookingCostRequestDTO,
    BookingCostResponseDTO,
    BookingResponseDTO,
    Page,
    ResponseData,
} from '../model';
import { fetchGet, fetchPost, fetchPut } from './FetchUtil';
import { BOOKING_SERVICE_ENDPOINTS, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, PAGE_REQUEST } from '../constant';

export class BookingUserService {
    static getBookingCost = (data: BookingCostRequestDTO): Promise<ResponseData<BookingCostResponseDTO>> => {
        return fetchPost<BookingCostResponseDTO>(BOOKING_SERVICE_ENDPOINTS.RESERVATION_COST, data);
    };

    static createBooking = (data: BookingAddRequestDTO): Promise<ResponseData<BookingResponseDTO>> => {
        return fetchPut<BookingResponseDTO>(BOOKING_SERVICE_ENDPOINTS.CREATE_BOOKING, data);
    };

    static getAuthenticatedUserBookingsList = (
        page: number = DEFAULT_PAGE_INDEX,
        size: number = DEFAULT_PAGE_SIZE,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<BookingResponseDTO>> => {
        return fetchGet<Page<BookingResponseDTO>>(
            PAGE_REQUEST(BOOKING_SERVICE_ENDPOINTS.GET_USER_BOOKINGS, page, size, filter, sortBy, desc)
        );
    };

    static cancelAuthorizedUserBooking = (bookingId: string): Promise<ResponseData<BookingResponseDTO>> => {
        return fetchPost<BookingResponseDTO>(
            BOOKING_SERVICE_ENDPOINTS.CANCEL_USER_BOOKING(bookingId),
            undefined,
            `Booking '${bookingId}' canceled`,
            `Cannot cancel booking '${bookingId}' - error occurred`
        );
    };

    static getAuthenticatedUserReservedBookingsList = (
        page?: number,
        size?: number,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<BookingResponseDTO>> => {
        return fetchGet<Page<BookingResponseDTO>>(
            PAGE_REQUEST(BOOKING_SERVICE_ENDPOINTS.GET_USER_BOOKINGS_RESERVED, page, size, filter, sortBy, desc)
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
            PAGE_REQUEST(BOOKING_SERVICE_ENDPOINTS.GET_USER_BOOKINGS_RENTED, page, size, filter, sortBy, desc)
        );
    };
}
