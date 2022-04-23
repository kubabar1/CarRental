import { VehicleResponseDTO } from '../model/VehicleResponseDTO';
import { VehiclePersistDTO } from '../model/VehiclePersistDTO';
import { fetchGet, fetchPost, fetchPut } from './FetchUtil';
import {
    GET_UNAVAILABLE_VEHICLES_PATH,
    GET_VEHICLE_BY_ID_PATH,
    GET_VEHICLES_PATH,
    UPDATE_VEHICLE_PATH,
    ADD_VEHICLE_PATH,
} from '../constants/PathsAPI';

export const getVehiclesList = (): Promise<VehicleResponseDTO[]> => {
    return fetchGet<VehicleResponseDTO[]>(GET_VEHICLES_PATH);
};

export const getVehicleById = (vehicleId: string): Promise<VehicleResponseDTO> => {
    return fetchGet<VehicleResponseDTO>(GET_VEHICLE_BY_ID_PATH(vehicleId));
};

export const getUnavailableVehiclesList = (): Promise<VehicleResponseDTO[]> => {
    return fetchGet<VehicleResponseDTO[]>(GET_UNAVAILABLE_VEHICLES_PATH);
};

export function updateVehicleData(vehicleId: string, vehicleUpdateDTO: VehiclePersistDTO): Promise<VehicleResponseDTO> {
    return fetchPost<VehicleResponseDTO>(UPDATE_VEHICLE_PATH(vehicleId), vehicleUpdateDTO);
}

export function addVehicle(vehicleAddDTO: VehiclePersistDTO): Promise<VehicleResponseDTO> {
    return fetchPut<VehicleResponseDTO>(ADD_VEHICLE_PATH, vehicleAddDTO);
}
