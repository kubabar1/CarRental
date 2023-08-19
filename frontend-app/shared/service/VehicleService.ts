import { fetchDelete, fetchGet, fetchPost, fetchPut, fetchWithFile } from './FetchUtil';
import { VEHICLE_SERVICE_ENDPOINTS, PAGE_REQUEST } from '../constant';
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
    ResponseData,
    AvailableVehiclesSearchDTO,
} from '../model';

export class VehicleService {
    static getBestOffersVehiclesList = (page?: number, size?: number): Promise<Page<VehicleResponseDTO>> => {
        return fetchGet<Page<VehicleResponseDTO>>(
            PAGE_REQUEST(VEHICLE_SERVICE_ENDPOINTS.GET_BEST_OFFERS_VEHICLES, page, size)
        );
    };

    static mapVehicleFiltersToQs = (vehicleFiltersMap: Map<FilteringParamsEnum, string | undefined>): ParsedQs => {
        const currentParams = {} as ParsedQs;
        Array.from(vehicleFiltersMap).forEach(([key, value]: [string, string | undefined]) => {
            currentParams[key] = value;
        });
        return currentParams;
    };

    static getVehiclesListWithFiltering = (
        vehicleFiltersMap: Map<FilteringParamsEnum, string | undefined>,
        page?: number,
        size?: number
    ): Promise<Page<VehicleResponseDTO>> => {
        const filterQueryParamsUrl: ParsedQs = VehicleService.mapVehicleFiltersToQs(vehicleFiltersMap);
        filterQueryParamsUrl['page'] = `${page}`;
        filterQueryParamsUrl['size'] = `${size}`;
        return fetchGet<Page<VehicleResponseDTO>>(
            `${VEHICLE_SERVICE_ENDPOINTS.GET_VEHICLE}/filter?${qs.stringify(filterQueryParamsUrl)}`
        );
    };

    static addVehicle(
        vehiclePersistDTO: VehiclePersistDTO,
        vehicleImage: File
    ): Promise<ResponseData<VehicleResponseDTO>> {
        const data = new FormData();
        const vehiclePersistDtoBlob = new Blob([JSON.stringify(vehiclePersistDTO)], {
            type: 'application/json',
        });
        data.append('vehiclePersistDTO', vehiclePersistDtoBlob);
        data.append('vehicleImage', vehicleImage);
        return fetchWithFile<VehicleResponseDTO>(
            'PUT',
            VEHICLE_SERVICE_ENDPOINTS.ADD_VEHICLE,
            data,
            'Vehicle added',
            'Cannot add vehicle - error occurred'
        );
    }

    static updateVehicleData(
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
        return fetchWithFile<VehicleResponseDTO>(
            'POST',
            VEHICLE_SERVICE_ENDPOINTS.UPDATE_VEHICLE(vehicleId),
            data,
            'Vehicle updated',
            'Cannot update vehicle - error occurred'
        );
    }

    static addBrand(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
        return fetchPut<OptionDTO>(
            VEHICLE_SERVICE_ENDPOINTS.ADD_BRAND,
            optionDTO,
            'Brand added',
            'Cannot add brand - error occurred'
        );
    }

    static addBodyType(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
        return fetchPut<OptionDTO>(
            VEHICLE_SERVICE_ENDPOINTS.ADD_BODY_TYPE,
            optionDTO,
            'Body type added',
            'Cannot add body type - error occurred'
        );
    }

    static addFuelType(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
        return fetchPut<OptionDTO>(
            VEHICLE_SERVICE_ENDPOINTS.ADD_FUEL_TYPE,
            optionDTO,
            'Fuel type added',
            'Cannot add fuel type - error occurred'
        );
    }

    static addColor(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
        return fetchPut<OptionDTO>(
            VEHICLE_SERVICE_ENDPOINTS.ADD_COLOR,
            optionDTO,
            'Color added',
            'Cannot add color - error occurred'
        );
    }

    static addModel(vehicleModelDTO: VehicleModelDTO): Promise<ResponseData<VehicleModelDTO>> {
        return fetchPut<VehicleModelDTO>(
            VEHICLE_SERVICE_ENDPOINTS.ADD_VEHICLE_MODEL,
            vehicleModelDTO,
            'Vehicle model added',
            'Cannot add model - error occurred'
        );
    }

    static getVehicleOptions = (): Promise<VehicleOptionsDTO> => {
        return fetchGet<VehicleOptionsDTO>(VEHICLE_SERVICE_ENDPOINTS.GET_VEHICLE_OPTIONS);
    };

    static getVehicleModelsByBrand = (brand: string): Promise<string[]> => {
        return fetchGet<string[]>(VEHICLE_SERVICE_ENDPOINTS.GET_VEHICLE_MODELS_BY_BRAND(brand));
    };

    static getVehiclesList = (
        page?: number,
        size?: number,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<VehicleResponseDTO>> => {
        return fetchGet<Page<VehicleResponseDTO>>(
            PAGE_REQUEST(VEHICLE_SERVICE_ENDPOINTS.GET_VEHICLE, page, size, filter, sortBy, desc)
        );
    };

    static addEquipment(equipmentAddDTO: EquipmentAddDTO): Promise<ResponseData<EquipmentResponseDTO>> {
        return fetchPut<EquipmentResponseDTO>(
            VEHICLE_SERVICE_ENDPOINTS.ADD_EQUIPMENT,
            equipmentAddDTO,
            'Equipment added',
            'Cannot add equipment - error occurred'
        );
    }

    static getVehicleOptionsWithAssoc = (): Promise<VehicleOptionsWithAssocCountDTO> => {
        return fetchGet<VehicleOptionsWithAssocCountDTO>(VEHICLE_SERVICE_ENDPOINTS.GET_VEHICLE_OPTIONS_WITH_ASSOC);
    };

    static getAvailableVehicles = (params: AvailableVehiclesSearchDTO): Promise<ResponseData<VehicleResponseDTO[]>> => {
        return fetchPost<VehicleResponseDTO[]>(VEHICLE_SERVICE_ENDPOINTS.GET_AVAILABLE_VEHICLES, params);
    };

    static deleteOption(vehicleOptionType: string, vehicleOption: string): Promise<ResponseData<OptionDTO>> {
        return fetchDelete<OptionDTO>(
            VEHICLE_SERVICE_ENDPOINTS.DELETE_SPECIFIC_VEHICLE_OPTION(vehicleOptionType, vehicleOption),
            undefined,
            'Option deleted',
            'Cannot delete option - error occurred'
        );
    }

    static getVehicleById = (vehicleId: string): Promise<VehicleResponseDTO> => {
        return fetchGet<VehicleResponseDTO>(VEHICLE_SERVICE_ENDPOINTS.GET_VEHICLE_BY_ID(vehicleId));
    };
}
