import { VehicleResponseDTO } from '../model/VehicleResponseDTO';
import { fetchGet } from './FetchUtil';
import {
    GET_VEHICLE_BY_ID_PATH,
    GET_VEHICLE_MODELS_BY_BRAND_PATH,
    GET_VEHICLE_OPTIONS_PATH,
    GET_BEST_OFFERS_VEHICLES_PATH,
    GET_VEHICLES_PATH,
    PAGE_REQUEST,
} from '../constants/PathsAPI';
import { VehicleOptionsDTO } from '../model/VehicleOptionsDTO';
import Page from '../model/Page';
import qs, { ParsedQs } from 'qs';
import FilteringParamsEnum from '../model/FilteringParamsEnum';

export const getVehiclesList = (page?: number, size?: number): Promise<Page<VehicleResponseDTO>> => {
    return fetchGet<Page<VehicleResponseDTO>>(PAGE_REQUEST(GET_VEHICLES_PATH, page, size));
};

export const getBestOffersVehiclesList = (page?: number, size?: number): Promise<Page<VehicleResponseDTO>> => {
    return fetchGet<Page<VehicleResponseDTO>>(PAGE_REQUEST(GET_BEST_OFFERS_VEHICLES_PATH, page, size));
};

export const mapVehicleFiltersToQs = (vehicleFiltersMap: Map<FilteringParamsEnum, string | undefined>): ParsedQs => {
    const currentParams = {} as ParsedQs;
    Array.from(vehicleFiltersMap).forEach(([key, value]: [string, string | undefined]) => {
        currentParams[key] = value;
    });
    return currentParams;
};

export const getVehiclesListWithFiltering = (
    vehicleFiltersMap: Map<FilteringParamsEnum, string | undefined>,
    page?: number,
    size?: number
): Promise<Page<VehicleResponseDTO>> => {
    const filterQueryParamsUrl: ParsedQs = mapVehicleFiltersToQs(vehicleFiltersMap);
    filterQueryParamsUrl['page'] = `${page}`;
    filterQueryParamsUrl['size'] = `${size}`;
    return fetchGet<Page<VehicleResponseDTO>>(`${GET_VEHICLES_PATH}/filter?${qs.stringify(filterQueryParamsUrl)}`);
};

export const getVehicleById = (vehicleId: string): Promise<VehicleResponseDTO> => {
    return fetchGet<VehicleResponseDTO>(GET_VEHICLE_BY_ID_PATH(vehicleId));
};

export const getVehicleModelsByBrand = (brand: string): Promise<string[]> => {
    return fetchGet<string[]>(GET_VEHICLE_MODELS_BY_BRAND_PATH(brand));
};

export const getVehicleOptions = (): Promise<VehicleOptionsDTO> => {
    return fetchGet<VehicleOptionsDTO>(GET_VEHICLE_OPTIONS_PATH);
};
