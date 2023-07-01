import { fetchGet, fetchPut, ResponseData } from './FetchUtil';
import { ADD_LOCATION_PATH, GET_ALL_LOCATIONS_PATH, GET_LOCATIONS_PATH, PAGE_REQUEST } from '../constant/PathsAPI';
import { LocalisationsResponseDTO, LocalisationResponseDTO, LocationAddDTO, Page } from '../model';

export const getAllLocationsList = (): Promise<LocalisationsResponseDTO> => {
    return fetchGet<LocalisationsResponseDTO>(GET_ALL_LOCATIONS_PATH);
};

export const getLocationsList = (
    page?: number,
    size?: number,
    filter?: string,
    sortBy?: string,
    desc?: boolean
): Promise<Page<LocalisationResponseDTO>> => {
    return fetchGet<Page<LocalisationResponseDTO>>(PAGE_REQUEST(GET_LOCATIONS_PATH, page, size, filter, sortBy, desc));
};

export const addLocation = (locationAddDTO: LocationAddDTO): Promise<ResponseData<LocalisationResponseDTO>> => {
    return fetchPut<LocalisationResponseDTO>(ADD_LOCATION_PATH, locationAddDTO);
};
