import { fetchGet, fetchPut } from './FetchUtil';
import { ADD_LOCATION_PATH, GET_ALL_LOCATIONS_PATH, GET_LOCATIONS_PATH, PAGE_REQUEST } from '../constant/PathsAPI';
import { LocalisationsResponseDTO, LocalisationResponseDTO, LocationAddDTO, Page, ResponseData } from '../model';

export class LocationService {
    static addLocation = (locationAddDTO: LocationAddDTO): Promise<ResponseData<LocalisationResponseDTO>> => {
        return fetchPut<LocalisationResponseDTO>(ADD_LOCATION_PATH, locationAddDTO);
    };

    static getLocationsList = (
        page?: number,
        size?: number,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<LocalisationResponseDTO>> => {
        return fetchGet<Page<LocalisationResponseDTO>>(
            PAGE_REQUEST(GET_LOCATIONS_PATH, page, size, filter, sortBy, desc)
        );
    };
    static getAllLocationsList = (): Promise<LocalisationsResponseDTO> => {
        return fetchGet<LocalisationsResponseDTO>(GET_ALL_LOCATIONS_PATH);
    };
}
