import { BookingAuditLogResponseDTO } from '../model/BookingAuditLogResponseDTO';
import { fetchGet } from './FetchUtil';
import { GET_BOOKINGS_AUDIT_LOGS_PATH } from '../constants/PathsAPI';
import Page from '../../../main-page/src/model/Page';
import { PAGE_REQUEST } from '../../../main-page/src/constants/PathsAPI';

export const getBookingsAuditLogsList = (
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
