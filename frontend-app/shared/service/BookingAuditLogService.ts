import { BookingAuditLogResponseDTO, Page } from '../model';
import { fetchGet } from './FetchUtil';
import { BOOKING_SERVICE_ENDPOINTS, PAGE_REQUEST } from '../constant';

export class BookingAuditLogService {
    static getBookingsAuditLogsList = (
        page?: number,
        size?: number,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<BookingAuditLogResponseDTO>> => {
        return fetchGet<Page<BookingAuditLogResponseDTO>>(
            PAGE_REQUEST(BOOKING_SERVICE_ENDPOINTS.GET_BOOKINGS_AUDIT_LOGS, page, size, filter, sortBy, desc)
        );
    };
}
