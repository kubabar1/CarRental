import { fetchGet } from './FetchUtil';
import { GET_VEHICLE_RATE_BY_ID_PATH, GET_VEHICLE_COMMENTS_BY_ID_PATH } from '../constants/PathsAPI';
import { AverageRateResponseDTO } from '../model/AverageRateResponseDTO';
import { CommentResponseDTO } from '../model/CommentResponseDTO';

export const getVehicleRate = (vehicleId: string): Promise<AverageRateResponseDTO> => {
    return fetchGet<AverageRateResponseDTO>(GET_VEHICLE_RATE_BY_ID_PATH(vehicleId));
};

export const getVehicleComments = (vehicleId: string): Promise<CommentResponseDTO[]> => {
    return fetchGet<CommentResponseDTO[]>(GET_VEHICLE_COMMENTS_BY_ID_PATH(vehicleId));
};
