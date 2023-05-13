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
import { PAGE_REQUEST } from '../../../main-page/src/constants/PathsAPI';
import Page from '../../../main-page/src/model/Page';

export const getAllEquipmentsList = (
    page?: number,
    size?: number,
    filter?: string,
    sortBy?: string,
    desc?: boolean
): Promise<Page<EquipmentResponseDTO>> => {
    return fetchGet<Page<EquipmentResponseDTO>>(PAGE_REQUEST(GET_EQUIPMENTS_PATH, page, size, filter, sortBy, desc));
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
