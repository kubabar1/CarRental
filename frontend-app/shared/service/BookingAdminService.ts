import { BookingResponseDTO, Page, BookingStateDTO, ResponseData } from '../model';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, BOOKING_SERVICE_ENDPOINTS, PAGE_REQUEST } from '../constant';
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
            PAGE_REQUEST(BOOKING_SERVICE_ENDPOINTS.GET_ADMIN_BOOKINGS, page, size, filter, sortBy, desc)
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
            PAGE_REQUEST(BOOKING_SERVICE_ENDPOINTS.GET_ADMIN_BOOKINGS_RESERVED, page, size, filter, sortBy, desc)
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
            PAGE_REQUEST(BOOKING_SERVICE_ENDPOINTS.GET_ADMIN_BOOKINGS_RENTED, page, size, filter, sortBy, desc)
        );
    };

    static rentBooking = (bookingId: string): Promise<ResponseData<BookingResponseDTO>> => {
        return fetchPost<BookingResponseDTO>(
            BOOKING_SERVICE_ENDPOINTS.RENT_ADMIN_BOOKING(bookingId),
            undefined,
            `Booking '${bookingId}' rented`,
            `Cannot rent booking '${bookingId}' - error occurred`
        );
    };

    static cancelBooking = (bookingId: string): Promise<ResponseData<BookingResponseDTO>> => {
        return fetchPost<BookingResponseDTO>(
            BOOKING_SERVICE_ENDPOINTS.CANCEL_ADMIN_BOOKING(bookingId),
            undefined,
            `Booking '${bookingId}' canceled`,
            `Cannot cancel booking '${bookingId}' - error occurred`
        );
    };

    static returnBooking = (bookingId: string): Promise<ResponseData<BookingResponseDTO>> => {
        return fetchPost<BookingResponseDTO>(
            BOOKING_SERVICE_ENDPOINTS.RETURN_ADMIN_BOOKING(bookingId),
            undefined,
            `Booking '${bookingId}' returned`,
            `Cannot return booking '${bookingId}' - error occurred`
        );
    };

    static getAllBookingStates = (): Promise<BookingStateDTO[]> => {
        return fetchGet<BookingStateDTO[]>(BOOKING_SERVICE_ENDPOINTS.BOOKING_STATES);
    };
}
