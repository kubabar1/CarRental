import { fetchGet, fetchPut } from './FetchUtil';
import { BOOKING_SERVICE_ENDPOINTS, PAGE_REQUEST } from '../constant';
import { LocalisationsResponseDTO, LocalisationResponseDTO, LocationAddDTO, Page, ResponseData } from '../model';

export class LocationService {
    static addLocation = (locationAddDTO: LocationAddDTO): Promise<ResponseData<LocalisationResponseDTO>> => {
        return fetchPut<LocalisationResponseDTO>(
            BOOKING_SERVICE_ENDPOINTS.ADD_LOCATION,
            locationAddDTO,
            'Location added',
            `Cannot add location - error occurred`
        );
    };

    static getLocationsList = (
        page?: number,
        size?: number,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<LocalisationResponseDTO>> => {
        return fetchGet<Page<LocalisationResponseDTO>>(
            PAGE_REQUEST(BOOKING_SERVICE_ENDPOINTS.GET_LOCATIONS, page, size, filter, sortBy, desc)
        );
    };

    static getAllLocationsList = (): Promise<LocalisationsResponseDTO> => {
        return fetchGet<LocalisationsResponseDTO>(BOOKING_SERVICE_ENDPOINTS.GET_ALL_LOCATIONS);
    };
}
