import { BookingAuditLogResponseDTO } from '../model/BookingAuditLogResponseDTO';
import { fetchGet } from './FetchUtil';
import { GET_BOOKINGS_AUDIT_LOGS_PATH } from '../constants/PathsAPI';

export const getBookingsAuditLogsList = (): Promise<BookingAuditLogResponseDTO[]> => {
    return fetchGet<BookingAuditLogResponseDTO[]>(GET_BOOKINGS_AUDIT_LOGS_PATH);
};
