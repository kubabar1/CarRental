import { fetchDelete, fetchGet, fetchPost, fetchPut, fetchWithFile } from './FetchUtil';
import {
    GET_VEHICLE_BY_ID_PATH,
    GET_BEST_OFFERS_VEHICLES_PATH,
    endpoints,
    GET_VEHICLES_PATH,
    UPDATE_VEHICLE_PATH,
    ADD_VEHICLE_PATH,
    PAGE_REQUEST,
    GET_VEHICLE_OPTIONS_PATH,
    ADD_BRAND_PATH,
    ADD_BODY_TYPE_PATH,
    ADD_FUEL_TYPE_PATH,
    ADD_COLOR_PATH,
    GET_VEHICLE_MODELS_BY_BRAND_PATH,
    ADD_VEHICLE_MODEL_PATH,
    ADD_EQUIPMENT,
    GET_VEHICLE_OPTIONS_WITH_ASSOC_PATH,
    DELETE_SPECIFIC_VEHICLE_OPTION_PATH,
} from '../constant';
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
        return fetchGet<Page<VehicleResponseDTO>>(PAGE_REQUEST(GET_BEST_OFFERS_VEHICLES_PATH, page, size));
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
        return fetchGet<Page<VehicleResponseDTO>>(`${GET_VEHICLES_PATH}/filter?${qs.stringify(filterQueryParamsUrl)}`);
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
            ADD_VEHICLE_PATH,
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
            UPDATE_VEHICLE_PATH(vehicleId),
            data,
            'Vehicle updated',
            'Cannot update vehicle - error occurred'
        );
    }

    static addBrand(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
        return fetchPut<OptionDTO>(ADD_BRAND_PATH, optionDTO, 'Brand added', 'Cannot add brand - error occurred');
    }

    static addBodyType(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
        return fetchPut<OptionDTO>(
            ADD_BODY_TYPE_PATH,
            optionDTO,
            'Body type added',
            'Cannot add body type - error occurred'
        );
    }

    static addFuelType(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
        return fetchPut<OptionDTO>(
            ADD_FUEL_TYPE_PATH,
            optionDTO,
            'Fuel type added',
            'Cannot add fuel type - error occurred'
        );
    }

    static addColor(optionDTO: OptionDTO): Promise<ResponseData<OptionDTO>> {
        return fetchPut<OptionDTO>(ADD_COLOR_PATH, optionDTO, 'Color added', 'Cannot add color - error occurred');
    }

    static addModel(vehicleModelDTO: VehicleModelDTO): Promise<ResponseData<VehicleModelDTO>> {
        return fetchPut<VehicleModelDTO>(
            ADD_VEHICLE_MODEL_PATH,
            vehicleModelDTO,
            'Vehicle model added',
            'Cannot add model - error occurred'
        );
    }

    static getVehicleOptions = (): Promise<VehicleOptionsDTO> => {
        return fetchGet<VehicleOptionsDTO>(GET_VEHICLE_OPTIONS_PATH);
    };

    static getVehicleModelsByBrand = (brand: string): Promise<string[]> => {
        return fetchGet<string[]>(GET_VEHICLE_MODELS_BY_BRAND_PATH(brand));
    };

    static getVehiclesList = (
        page?: number,
        size?: number,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<VehicleResponseDTO>> => {
        return fetchGet<Page<VehicleResponseDTO>>(PAGE_REQUEST(GET_VEHICLES_PATH, page, size, filter, sortBy, desc));
    };

    static addEquipment(equipmentAddDTO: EquipmentAddDTO): Promise<ResponseData<EquipmentResponseDTO>> {
        return fetchPut<EquipmentResponseDTO>(
            ADD_EQUIPMENT,
            equipmentAddDTO,
            'Equipment added',
            'Cannot add equipment - error occurred'
        );
    }

    static getVehicleOptionsWithAssoc = (): Promise<VehicleOptionsWithAssocCountDTO> => {
        return fetchGet<VehicleOptionsWithAssocCountDTO>(GET_VEHICLE_OPTIONS_WITH_ASSOC_PATH);
    };

    static getAvailableVehicles = (params: AvailableVehiclesSearchDTO): Promise<ResponseData<VehicleResponseDTO[]>> => {
        return fetchPost<VehicleResponseDTO[]>(endpoints.getAvailableVehicles, params);
    };

    static deleteOption(vehicleOptionType: string, vehicleOption: string): Promise<ResponseData<OptionDTO>> {
        return fetchDelete<OptionDTO>(
            DELETE_SPECIFIC_VEHICLE_OPTION_PATH(vehicleOptionType, vehicleOption),
            undefined,
            'Option deleted',
            'Cannot delete option - error occurred'
        );
    }

    static getVehicleById = (vehicleId: string): Promise<VehicleResponseDTO> => {
        return fetchGet<VehicleResponseDTO>(GET_VEHICLE_BY_ID_PATH(vehicleId));
    };
}
