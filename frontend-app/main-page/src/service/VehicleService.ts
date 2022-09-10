import { VehicleResponseDTO } from '../model/VehicleResponseDTO';
import { fetchGet } from './FetchUtil';
import {
    GET_VEHICLE_BY_ID_PATH,
    GET_VEHICLE_MODELS_BY_BRAND_PATH,
    GET_VEHICLES_FILTER_PARAMS_PATH,
    GET_VEHICLES_PATH,
} from '../constants/PathsAPI';
import { VehicleFiltersParamsDTO } from '../model/VehicleFiltersParamsDTO';

export const getVehiclesList = (): Promise<VehicleResponseDTO[]> => {
    return fetchGet<VehicleResponseDTO[]>(GET_VEHICLES_PATH);
};

export const getVehiclesListWithFiltering = (filterQueryParamsUrl: string): Promise<VehicleResponseDTO[]> => {
    return fetchGet<VehicleResponseDTO[]>(`${GET_VEHICLES_PATH}/filter?${filterQueryParamsUrl}`);
};

export const getVehicleById = (vehicleId: string): Promise<VehicleResponseDTO> => {
    return fetchGet<VehicleResponseDTO>(GET_VEHICLE_BY_ID_PATH(vehicleId));
};

export const getVehicleModelsByBrand = (brand: string): Promise<string[]> => {
    return fetchGet<string[]>(GET_VEHICLE_MODELS_BY_BRAND_PATH(brand));
};

export const getVehiclesFilterParams = (): Promise<VehicleFiltersParamsDTO> => {
    return fetchGet<VehicleFiltersParamsDTO>(GET_VEHICLES_FILTER_PARAMS_PATH);
};
