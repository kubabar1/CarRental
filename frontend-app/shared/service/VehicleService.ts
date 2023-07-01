import { fetchDelete, fetchGet, fetchPut, fetchWithFile, ResponseData } from './FetchUtil';
import {
    GET_VEHICLE_BY_ID_PATH,
    GET_BEST_OFFERS_VEHICLES_PATH,
    endpoints,
    GET_UNAVAILABLE_VEHICLES_PATH,
    GET_VEHICLES_PATH,
    UPDATE_VEHICLE_PATH,
    ADD_VEHICLE_PATH,
    PAGE_REQUEST,
    GET_VEHICLE_OPTIONS_PATH,
    ADD_BRAND_PATH,
    ADD_BODY_TYPE_PATH,
    ADD_FUEL_TYPE_PATH,
    ADD_GEARBOX_PATH,
    ADD_COLOR_PATH,
    GET_VEHICLE_MODELS_BY_BRAND_PATH,
    ADD_VEHICLE_MODEL_PATH,
    ADD_EQUIPMENT,
    GET_VEHICLE_OPTIONS_WITH_ASSOC_PATH,
    DELETE_SPECIFIC_VEHICLE_OPTION_PATH,
} from '../constant/PathsAPI';
import qs, { ParsedQs } from 'qs';
import {
    VehicleOptionsWithAssocCountDTO,
    Page,
    EquipmentResponseDTO,
    EquipmentAddDTO,
    OptionDTO,
    VehicleModelDTO,
    VehicleOptionsDTO,
    VehiclePersistDTO,
    FilteringParamsEnum,
    VehicleResponseDTO,
} from '../model';

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

export const getAvailableVehiclesByLocation = (locationId: string): Promise<VehicleResponseDTO[]> => {
    return fetchGet<VehicleResponseDTO[]>(endpoints.getAvailableVehiclesByLocation(locationId));
};

export const getVehiclesList = (
    page?: number,
    size?: number,
    filter?: string,
    sortBy?: string,
    desc?: boolean
): Promise<Page<VehicleResponseDTO>> => {
    return fetchGet<Page<VehicleResponseDTO>>(PAGE_REQUEST(GET_VEHICLES_PATH, page, size, filter, sortBy, desc));
};

export const getUnavailableVehiclesList = (page?: number, size?: number): Promise<Page<VehicleResponseDTO>> => {
    return fetchGet<Page<VehicleResponseDTO>>(PAGE_REQUEST(GET_UNAVAILABLE_VEHICLES_PATH, page, size));
};

export function updateVehicleData(
    vehicleId: string,
    vehicleUpdateDTO: VehiclePersistDTO,
    vehicleImage: File
): Promise<ResponseData<VehicleResponseDTO>> {
    const data = new FormData();
    const vehiclePersistDtoBlob = new Blob([JSON.stringify(vehicleUpdateDTO)], {
        type: 'application/json',
    });
    data.append('vehiclePersistDTO', vehiclePersistDtoBlob);
    if (vehicleImage.size) {
        data.append('vehicleImage', vehicleImage);
    }
    return fetchWithFile<VehicleResponseDTO>('POST', UPDATE_VEHICLE_PATH(vehicleId), data);
}

export function addVehicle(
    vehiclePersistDTO: VehiclePersistDTO,
    vehicleImage: File
): Promise<ResponseData<VehicleResponseDTO>> {
    const data = new FormData();
    const vehiclePersistDtoBlob = new Blob([JSON.stringify(vehiclePersistDTO)], {
        type: 'application/json',
    });
    data.append('vehiclePersistDTO', vehiclePersistDtoBlob);
    data.append('vehicleImage', vehicleImage);
    return fetchWithFile<VehicleResponseDTO>('PUT', ADD_VEHICLE_PATH, data);
}

export function addEquipment(equipmentAddDTO: EquipmentAddDTO): Promise<ResponseData<EquipmentResponseDTO>> {
    return fetchPut<EquipmentResponseDTO>(ADD_EQUIPMENT, equipmentAddDTO);
}

export const getVehicleOptions = (): Promise<VehicleOptionsDTO> => {
    return fetchGet<VehicleOptionsDTO>(GET_VEHICLE_OPTIONS_PATH);
};

export const getVehicleOptionsWithAssoc = (): Promise<VehicleOptionsWithAssocCountDTO> => {
    return fetchGet<VehicleOptionsWithAssocCountDTO>(GET_VEHICLE_OPTIONS_WITH_ASSOC_PATH);
};

export function addBrand(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
    return fetchPut<OptionDTO>(ADD_BRAND_PATH, optionDTO);
}

export function addBodyType(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
    return fetchPut<OptionDTO>(ADD_BODY_TYPE_PATH, optionDTO);
}

export function addFuelType(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
    return fetchPut<OptionDTO>(ADD_FUEL_TYPE_PATH, optionDTO);
}

export function addGearbox(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
    return fetchPut<OptionDTO>(ADD_GEARBOX_PATH, optionDTO);
}

export function addColor(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
    return fetchPut<OptionDTO>(ADD_COLOR_PATH, optionDTO);
}

export function addModel(vehicleModelDTO: VehicleModelDTO): Promise<ResponseData<VehicleModelDTO>> {
    return fetchPut<VehicleModelDTO>(ADD_VEHICLE_MODEL_PATH, vehicleModelDTO);
}

export function deleteOption(vehicleOptionType: string, vehicleOption: string): Promise<ResponseData<OptionDTO>> {
    return fetchDelete<OptionDTO>(DELETE_SPECIFIC_VEHICLE_OPTION_PATH(vehicleOptionType, vehicleOption));
}

export const getVehicleModelsByBrand = (brand: string): Promise<string[]> => {
    return fetchGet<string[]>(GET_VEHICLE_MODELS_BY_BRAND_PATH(brand));
};
