import { LocationResponseDTO } from '../model/LocationResponseDTO';
import { fetchGet } from './FetchUtil';
import { GET_LOCATIONS_PATH } from '../constants/PathsAPI';

export const getLocationsList = (): Promise<LocationResponseDTO[]> => {
    return fetchGet<LocationResponseDTO[]>(GET_LOCATIONS_PATH);
};
