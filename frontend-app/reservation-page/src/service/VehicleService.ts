import { fetchGet } from '../utils/FetchUtil';
import { endpoints } from '../constants/PathsAPI';
import { VehicleResponseDTO } from '../model/VehicleResponseDTO';

export const getAvailableVehiclesByLocation = (locationId: string): Promise<VehicleResponseDTO[]> => {
    return fetchGet<VehicleResponseDTO[]>(endpoints.getAvailableVehiclesByLocation(locationId));
};
