import React from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { useHistory } from 'react-router-dom';
import { addVehicle } from '../../service/VehicleService';
import { VehiclePersistDTO } from '../../model/VehiclePersistDTO';
import { vehiclesListPath } from '../../constants/Links';
import { VehicleForm } from './components/vehicle_form/VehicleForm';

export function VehicleAddSubpage(): JSX.Element {
    const history = useHistory();

    const addVehicleForm = async (vehiclePersistDTO: VehiclePersistDTO): Promise<void> => {
        addVehicle(vehiclePersistDTO).then(() => {
            history.push(vehiclesListPath.link);
        });
    };

    return (
        <SubpageContainer>
            <SubpageHeader title={'Vehicle add'} />
            <SubpageContent>
                <VehicleForm onSubmitAction={addVehicleForm} />
            </SubpageContent>
        </SubpageContainer>
    );
}
