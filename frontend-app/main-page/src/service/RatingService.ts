import { fetchGet, fetchPut } from './FetchUtil';
import { GET_VEHICLE_COMMENTS_BY_ID_PATH, PAGE_REQUEST, ADD_COMMENT_PATH } from '../constants/PathsAPI';
import Page from '../model/Page';
import { CommentWithRateAddDTO } from '../model/CommentWithRateAddDTO';
import { CommentWithRateResponseDTO } from '../model/CommentWithRateResponseDTO';

export const getVehicleComments = (
    vehicleId: string,
    page?: number,
    size?: number
): Promise<Page<CommentWithRateResponseDTO>> => {
    return fetchGet<Page<CommentWithRateResponseDTO>>(
        PAGE_REQUEST(GET_VEHICLE_COMMENTS_BY_ID_PATH(vehicleId), page, size)
    );
};

export const addComment = (rate: CommentWithRateAddDTO): Promise<CommentWithRateResponseDTO> => {
    return fetchPut<CommentWithRateResponseDTO>(ADD_COMMENT_PATH, rate);
};
