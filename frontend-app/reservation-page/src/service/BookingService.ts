import { fetchPost, fetchPut } from '../utils/FetchUtil';
import { endpoints } from '../constants/PathsAPI';
import BookingCostResponseDTO from '../model/BookingCostResponseDTO';
import BookingCostRequestDTO from '../model/BookingCostRequestDTO';
import BookingAddRequestDTO from '../model/BookingAddRequestDTO';
import { BookingResponseDTO } from '../model/BookingResponseDTO';

export const getBookingCost = (data: BookingCostRequestDTO): Promise<BookingCostResponseDTO> => {
    return fetchPost<BookingCostResponseDTO>(endpoints.reservationCost, data);
};

export const createBooking = (data: BookingAddRequestDTO): Promise<BookingResponseDTO> => {
    return fetchPut<BookingResponseDTO>(endpoints.createBooking, data);
};
