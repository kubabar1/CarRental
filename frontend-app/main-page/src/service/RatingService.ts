import { fetchGet } from './FetchUtil';
import { GET_VEHICLE_RATE_BY_ID_PATH, GET_VEHICLE_COMMENTS_BY_ID_PATH, PAGE_REQUEST } from '../constants/PathsAPI';
import { AverageRateResponseDTO } from '../model/AverageRateResponseDTO';
import { CommentResponseDTO } from '../model/CommentResponseDTO';
import Page from '../model/Page';

export const getVehicleRate = (vehicleId: string): Promise<AverageRateResponseDTO> => {
    return fetchGet<AverageRateResponseDTO>(GET_VEHICLE_RATE_BY_ID_PATH(vehicleId));
};

export const getVehicleComments = (
    vehicleId: string,
    page?: number,
    size?: number
): Promise<Page<CommentResponseDTO>> => {
    return fetchGet<Page<CommentResponseDTO>>(PAGE_REQUEST(GET_VEHICLE_COMMENTS_BY_ID_PATH(vehicleId), page, size));
};
