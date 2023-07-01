import { fetchGet, fetchPost, ResponseData } from './FetchUtil';
import { EquipmentPersistDTO, EquipmentSetPersistDTO, EquipmentResponseDTO, VehicleResponseDTO, Page } from '../model';
import {
    ADD_EQUIPMENT_TO_VEHICLE_PATH,
    DEFAULT_PAGE_INDEX,
    DEFAULT_PAGE_SIZE,
    GET_EQUIPMENTS_NOT_ASSIGNED_TO_VEHICLE_PATH,
    GET_EQUIPMENTS_PATH,
    PAGE_REQUEST,
    REMOVE_EQUIPMENT_FROM_VEHICLE_PATH,
} from '../constant/PathsAPI';

export const getAllEquipmentsList = (
    page: number = DEFAULT_PAGE_INDEX,
    size: number = DEFAULT_PAGE_SIZE,
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
): Promise<ResponseData<VehicleResponseDTO>> {
    return fetchPost<VehicleResponseDTO>(
        ADD_EQUIPMENT_TO_VEHICLE_PATH(vehicleId),
        mapVehicleEquipmentCodeArrayToEquipmentSetPersistDTO(vehicleEquipmentCodeArray)
    );
}

export function removeEquipmentFromVehicle(
    vehicleId: string,
    vehicleEquipmentCode: string
): Promise<ResponseData<VehicleResponseDTO>> {
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
