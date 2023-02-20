import React from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { useHistory } from 'react-router-dom';
import { addVehicle } from '../../service/VehicleService';
import { VehiclePersistDTO } from '../../model/VehiclePersistDTO';
import { vehiclesListPath } from '../../constants/Links';
import { VehicleForm, VehicleFormValues } from './components/vehicle_form/VehicleForm';
import { VehicleStatCodeEnum } from '../../model/VehicleStatCodeEnum';
import { FileWithPreview } from '../../components/form/form-group/upload/Dropzone';

export function VehicleAddSubpage(): JSX.Element {
    const history = useHistory();

    const addVehicleForm = async (vehiclePersistDTO: VehiclePersistDTO, vehicleImage: File): Promise<void> => {
        addVehicle(vehiclePersistDTO, vehicleImage).then(() => {
            // history.push(vehiclesListPath.link);
        });
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
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
