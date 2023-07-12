import React from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { TranslationService, VehicleService } from '@car-rental/shared/service';
import { VehicleForm, VehicleFormValues } from './components/vehicle_form/VehicleForm';
import { VehicleStatCodeEnum, VehiclePersistDTO, VehicleResponseDTO, ResponseData } from '@car-rental/shared/model';
import { FileWithPreview } from '../../components/form/form-group/upload/Dropzone';

export function VehicleAddSubpage(): JSX.Element {
    const addVehicleForm = async (
        vehiclePersistDTO: VehiclePersistDTO,
        vehicleImage: File
    ): Promise<ResponseData<VehicleResponseDTO>> => {
        return VehicleService.addVehicle(vehiclePersistDTO, vehicleImage);
    };

    const vehicleDefaultValues: VehicleFormValues = {
        brand: '',
        model: '',
        dailyFee: 0,
        registration: '',
        location: '0',
        vehicleStatus: VehicleStatCodeEnum.AVI,
        bestOffer: false,
        bodyType: '',
        fuelType: '',
        power: 0,
        gearbox: '',
        frontWheelDrive: false,
        doorsCount: 0,
        seatsCount: 0,
        color: '',
        metallic: false,
        description: '',
        productionYear: 0,
        vehicleImage: {} as FileWithPreview,
    };

    return (
        <SubpageContainer>
            <SubpageHeader title={TranslationService.translate('addVehicleSubpageTitle')} />
            <SubpageContent>
                <VehicleForm
                    onSubmitAction={addVehicleForm}
                    vehicleDefaultValues={vehicleDefaultValues}
                    submitButtonValue={TranslationService.translate('addVehicleSubpageCreateButton')}
                    redirectToEquipmentList
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
