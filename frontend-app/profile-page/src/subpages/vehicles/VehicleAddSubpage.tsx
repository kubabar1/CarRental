import React from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { addVehicle } from '../../service/VehicleService';
import { VehiclePersistDTO } from '../../model/VehiclePersistDTO';
import { VehicleForm, VehicleFormValues } from './components/vehicle_form/VehicleForm';
import { VehicleStatCodeEnum } from '../../model/VehicleStatCodeEnum';
import { FileWithPreview } from '../../components/form/form-group/upload/Dropzone';
import { ResponseData } from '../../service/FetchUtil';
import { VehicleResponseDTO } from '../../model/VehicleResponseDTO';

export function VehicleAddSubpage(): JSX.Element {
    const addVehicleForm = async (
        vehiclePersistDTO: VehiclePersistDTO,
        vehicleImage: File
    ): Promise<ResponseData<VehicleResponseDTO>> => {
        return addVehicle(vehiclePersistDTO, vehicleImage);
    };

    const vehicleDefaultValues: VehicleFormValues = {
        brand: '',
        model: '',
        dailyFee: 0,
        registration: '',
        location: 0,
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
            <SubpageHeader title={'Add vehicle'} />
            <SubpageContent>
                <VehicleForm
                    onSubmitAction={addVehicleForm}
                    vehicleDefaultValues={vehicleDefaultValues}
                    submitButtonValue={'Create'}
                    redirectToEquipmentList
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
