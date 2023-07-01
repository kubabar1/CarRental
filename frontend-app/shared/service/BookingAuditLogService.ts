import { BookingAuditLogResponseDTO, Page } from '../model';
import { fetchGet } from './FetchUtil';
import { GET_BOOKINGS_AUDIT_LOGS_PATH, PAGE_REQUEST } from '../constant/PathsAPI';

export class BookingAuditLogService {
    static getBookingsAuditLogsList = (
        page?: number,
        size?: number,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<BookingAuditLogResponseDTO>> => {
        return fetchGet<Page<BookingAuditLogResponseDTO>>(
            PAGE_REQUEST(GET_BOOKINGS_AUDIT_LOGS_PATH, page, size, filter, sortBy, desc)
        );
    };
}
