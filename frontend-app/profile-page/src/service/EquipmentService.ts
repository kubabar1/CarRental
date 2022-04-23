import { EquipmentResponseDTO } from '../model/EquipmentResponseDTO';
import { fetchGet, fetchPost } from './FetchUtil';
import {
    ADD_EQUIPMENT_TO_VEHICLE_PATH,
    REMOVE_EQUIPMENT_FROM_VEHICLE_PATH,
    GET_EQUIPMENTS_PATH,
    GET_EQUIPMENTS_NOT_ASSIGNED_TO_VEHICLE_PATH,
} from '../constants/PathsAPI';
import { VehicleResponseDTO } from '../model/VehicleResponseDTO';
import { EquipmentPersistDTO } from '../model/EquipmentPersistDTO';
import { EquipmentSetPersistDTO } from '../model/EquipmentSetPersistDTO';

export const getAllEquipmentsList = (): Promise<EquipmentResponseDTO[]> => {
    return fetchGet<EquipmentResponseDTO[]>(GET_EQUIPMENTS_PATH);
};

export const getAllEquipmentsNotAssignedToVehicleList = (vehicleId: string): Promise<EquipmentResponseDTO[]> => {
    return fetchGet<EquipmentResponseDTO[]>(GET_EQUIPMENTS_NOT_ASSIGNED_TO_VEHICLE_PATH(vehicleId));
};

export function addEquipmentsToVehicle(
    vehicleId: string,
    vehicleEquipmentCodeArray: string[]
): Promise<VehicleResponseDTO> {
    return fetchPost<VehicleResponseDTO>(
        ADD_EQUIPMENT_TO_VEHICLE_PATH(vehicleId),
        mapVehicleEquipmentCodeArrayToEquipmentSetPersistDTO(vehicleEquipmentCodeArray)
    );
}

export function removeEquipmentFromVehicle(
    vehicleId: string,
    vehicleEquipmentCode: string
): Promise<VehicleResponseDTO> {
    return fetchPost<VehicleResponseDTO>(
        REMOVE_EQUIPMENT_FROM_VEHICLE_PATH(vehicleId),
        new EquipmentPersistDTO(vehicleEquipmentCode)
    );
}

export const mapVehicleEquipmentCodeArrayToEquipmentSetPersistDTO = (
    vehicleEquipmentCodeArray: string[]
): EquipmentSetPersistDTO => {
    return new EquipmentSetPersistDTO(
        vehicleEquipmentCodeArray.map((vehicleEquipmentCode: string) => {
            return new EquipmentPersistDTO(vehicleEquipmentCode);
        })
    );
};
