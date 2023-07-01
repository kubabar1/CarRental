import { fetchPost, fetchPut, ResponseData } from './FetchUtil';
import { endpoints } from '../constant/PathsAPI';
import { BookingCostResponseDTO, BookingCostRequestDTO, BookingAddRequestDTO, BookingResponseDTO } from '../model';

export const getBookingCost = (data: BookingCostRequestDTO): Promise<ResponseData<BookingCostResponseDTO>> => {
    return fetchPost<BookingCostResponseDTO>(endpoints.reservationCost, data);
};

export const createBooking = (data: BookingAddRequestDTO): Promise<ResponseData<BookingResponseDTO>> => {
    return fetchPut<BookingResponseDTO>(endpoints.createBooking, data);
};
