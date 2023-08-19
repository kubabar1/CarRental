import { fetchGet, fetchPut } from './FetchUtil';
import { RATING_SERVICE_ENDPOINTS, PAGE_REQUEST } from '../constant';
import { CommentWithRateAddDTO, CommentWithRateResponseDTO, ResponseData, Page } from '../model';

export class RatingService {
    static getVehicleComments = (
        vehicleId: string,
        page?: number,
        size?: number
    ): Promise<Page<CommentWithRateResponseDTO>> => {
        return fetchGet<Page<CommentWithRateResponseDTO>>(
            PAGE_REQUEST(RATING_SERVICE_ENDPOINTS.GET_VEHICLE_COMMENTS_BY_ID(vehicleId), page, size)
        );
    };

    static addComment = (rate: CommentWithRateAddDTO): Promise<ResponseData<CommentWithRateResponseDTO>> => {
        return fetchPut<CommentWithRateResponseDTO>(RATING_SERVICE_ENDPOINTS.ADD_COMMENT, rate);
    };
}
