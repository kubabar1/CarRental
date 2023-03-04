import { LocationResponseDTO } from '../model/LocationResponseDTO';
import { fetchGet, fetchPut, ResponseData } from './FetchUtil';
import { ADD_LOCATION_PATH, GET_LOCATIONS_PATH } from '../constants/PathsAPI';
import { PAGE_REQUEST } from '../../../main-page/src/constants/PathsAPI';
import Page from '../../../main-page/src/model/Page';
import { LocationAddDTO } from '../model/LocationAddDTO';

export const getLocationsList = (page?: number, size?: number): Promise<Page<LocationResponseDTO>> => {
    return fetchGet<Page<LocationResponseDTO>>(PAGE_REQUEST(GET_LOCATIONS_PATH, page, size));
};

export const addLocation = (locationAddDTO: LocationAddDTO): Promise<ResponseData<LocationResponseDTO>> => {
    return fetchPut<LocationResponseDTO>(ADD_LOCATION_PATH, locationAddDTO);
};
