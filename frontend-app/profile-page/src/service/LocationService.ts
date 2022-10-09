import { LocationResponseDTO } from '../model/LocationResponseDTO';
import { fetchGet } from './FetchUtil';
import { GET_LOCATIONS_PATH } from '../constants/PathsAPI';
import { PAGE_REQUEST } from '../../../main-page/src/constants/PathsAPI';
import Page from '../../../main-page/src/model/Page';

export const getLocationsList = (page?: number, size?: number): Promise<Page<LocationResponseDTO>> => {
    return fetchGet<Page<LocationResponseDTO>>(PAGE_REQUEST(GET_LOCATIONS_PATH, page, size));
};
