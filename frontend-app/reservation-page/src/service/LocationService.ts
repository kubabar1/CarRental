import { fetchGet } from '../utils/FetchUtil';
import { endpoints } from '../constants/PathsAPI';
import { LocalisationsResponseDTO } from '../model/LocalisationsResponseDTO';

export const getAllLocationsList = (): Promise<LocalisationsResponseDTO> => {
    return fetchGet<LocalisationsResponseDTO>(endpoints.allLocations);
};
