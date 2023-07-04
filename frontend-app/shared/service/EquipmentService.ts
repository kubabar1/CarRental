import { fetchGet, fetchPost } from './FetchUtil';
import {
    EquipmentPersistDTO,
    EquipmentSetPersistDTO,
    EquipmentResponseDTO,
    VehicleResponseDTO,
    Page,
    ResponseData,
} from '../model';
import {
    ADD_EQUIPMENT_TO_VEHICLE_PATH,
    DEFAULT_PAGE_INDEX,
    DEFAULT_PAGE_SIZE,
    GET_EQUIPMENTS_NOT_ASSIGNED_TO_VEHICLE_PATH,
    GET_EQUIPMENTS_PATH,
    PAGE_REQUEST,
    REMOVE_EQUIPMENT_FROM_VEHICLE_PATH,
} from '../constant';

export class EquipmentService {
    static getAllEquipmentsList = (
        page: number = DEFAULT_PAGE_INDEX,
        size: number = DEFAULT_PAGE_SIZE,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<EquipmentResponseDTO>> => {
        return fetchGet<Page<EquipmentResponseDTO>>(
            PAGE_REQUEST(GET_EQUIPMENTS_PATH, page, size, filter, sortBy, desc)
        );
    };

    static addEquipmentsToVehicle = (
        vehicleId: string,
        vehicleEquipmentCodeArray: string[]
    ): Promise<ResponseData<VehicleResponseDTO>> => {
        return fetchPost<VehicleResponseDTO>(
            ADD_EQUIPMENT_TO_VEHICLE_PATH(vehicleId),
            EquipmentService.mapVehicleEquipmentCodeArrayToEquipmentSetPersistDTO(vehicleEquipmentCodeArray),
            'Equipment added',
            'Cannot add equipment - error occurred'
        );
    };

    static removeEquipmentFromVehicle = (
        vehicleId: string,
        vehicleEquipmentCode: string
    ): Promise<ResponseData<VehicleResponseDTO>> => {
        return fetchPost<VehicleResponseDTO>(
            REMOVE_EQUIPMENT_FROM_VEHICLE_PATH(vehicleId),
            new EquipmentPersistDTO(vehicleEquipmentCode),
            'Equipment removed',
            'Cannot removed equipment - error occurred'
        );
    };

    static mapVehicleEquipmentCodeArrayToEquipmentSetPersistDTO = (
        vehicleEquipmentCodeArray: string[]
    ): EquipmentSetPersistDTO => {
        return new EquipmentSetPersistDTO(
            vehicleEquipmentCodeArray.map((vehicleEquipmentCode: string) => {
                return new EquipmentPersistDTO(vehicleEquipmentCode);
            })
        );
    };

    static getAllEquipmentsNotAssignedToVehicleList = (vehicleId: string): Promise<EquipmentResponseDTO[]> => {
        return fetchGet<EquipmentResponseDTO[]>(GET_EQUIPMENTS_NOT_ASSIGNED_TO_VEHICLE_PATH(vehicleId));
    };
}
