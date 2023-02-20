import { VehicleResponseDTO } from '../model/VehicleResponseDTO';
import { VehiclePersistDTO } from '../model/VehiclePersistDTO';
import { fetchGet, fetchPut, fetchWithFile, ResponseData } from './FetchUtil';
import {
    GET_UNAVAILABLE_VEHICLES_PATH,
    GET_VEHICLE_BY_ID_PATH,
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
} from '../constants/PathsAPI';
import Page from '../../../main-page/src/model/Page';
import { VehicleOptionsDTO } from '../model/VehicleOptionsDTO';
import { OptionDTO } from '../model/OptionDTO';
import { VehicleModelDTO } from '../model/VehicleModelDTO';

export const getVehiclesList = (page?: number, size?: number): Promise<Page<VehicleResponseDTO>> => {
    return fetchGet<Page<VehicleResponseDTO>>(PAGE_REQUEST(GET_VEHICLES_PATH, page, size));
};

export const getVehicleById = (vehicleId: string): Promise<VehicleResponseDTO> => {
    return fetchGet<VehicleResponseDTO>(GET_VEHICLE_BY_ID_PATH(vehicleId));
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

export const getVehicleOptions = (): Promise<VehicleOptionsDTO> => {
    return fetchGet<VehicleOptionsDTO>(GET_VEHICLE_OPTIONS_PATH);
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

export const getVehicleModelsByBrand = (brand: string): Promise<string[]> => {
    return fetchGet<string[]>(GET_VEHICLE_MODELS_BY_BRAND_PATH(brand));
};
