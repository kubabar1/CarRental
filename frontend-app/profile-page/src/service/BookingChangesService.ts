import { BookingChangeResponseDTO } from '../model/BookingChangeResponseDTO';
import { fetchGet } from './FetchUtil';
import { GET_BOOKINGS_CHANGES_PATH } from '../constants/PathsAPI';

export const getBookingChangesList = (): Promise<BookingChangeResponseDTO[]> => {
    return fetchGet<BookingChangeResponseDTO[]>(GET_BOOKINGS_CHANGES_PATH);
};
