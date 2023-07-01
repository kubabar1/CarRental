import { fetchGet, fetchPut } from './FetchUtil';
import { GET_VEHICLE_COMMENTS_BY_ID_PATH, PAGE_REQUEST, ADD_COMMENT_PATH } from '../constant/PathsAPI';
import { CommentWithRateAddDTO, CommentWithRateResponseDTO, ResponseData, Page } from '../model';

export class RatingService {
    static getVehicleComments = (
        vehicleId: string,
        page?: number,
        size?: number
    ): Promise<Page<CommentWithRateResponseDTO>> => {
        return fetchGet<Page<CommentWithRateResponseDTO>>(
            PAGE_REQUEST(GET_VEHICLE_COMMENTS_BY_ID_PATH(vehicleId), page, size)
        );
    };

    static addComment = (rate: CommentWithRateAddDTO): Promise<ResponseData<CommentWithRateResponseDTO>> => {
        return fetchPut<CommentWithRateResponseDTO>(ADD_COMMENT_PATH, rate);
    };
}
