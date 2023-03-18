import { fetchGet } from './FetchUtil';
import { GET_ALL_LOCATIONS_PATH } from '../constants/PathsAPI';
import { LocalisationsResponseDTO } from '../model/LocalisationsResponseDTO';

export const getAllLocationsList = (): Promise<LocalisationsResponseDTO> => {
    return fetchGet<LocalisationsResponseDTO>(GET_ALL_LOCATIONS_PATH);
};
