import React, { useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { VehicleResponseDTO } from '../../model/VehicleResponseDTO';
import { useHistory, useParams } from 'react-router-dom';
import { getVehicleById, updateVehicleData } from '../../service/VehicleService';
import { VehiclePersistDTO } from '../../model/VehiclePersistDTO';
import { vehiclesListPath } from '../../constants/Links';
import { VehicleForm } from './components/vehicle_form/VehicleForm';

export function VehicleEditSubpage(): JSX.Element {
    const history = useHistory();
    const { vehicleId } = useParams<{ vehicleId: string }>();
    const [vehicleResponseDTO, setVehicleResponseDTO] = useState<VehicleResponseDTO | undefined>(undefined);

    useEffect(() => {
        getVehicleById(vehicleId).then((vehicleResp: VehicleResponseDTO) => {
            setVehicleResponseDTO(vehicleResp);
        });
    }, [vehicleId]);

    const updateVehicleForm = (vehiclePersistDTO: VehiclePersistDTO): void => {
        updateVehicleData(vehicleId, vehiclePersistDTO);
        history.push(vehiclesListPath);
    };

    return (
        <SubpageContainer>
            <SubpageHeader title={'Vehicle edit'} />
            <SubpageContent>
                <VehicleForm onSubmitAction={updateVehicleForm} vehicleResponseDTO={vehicleResponseDTO} />
            </SubpageContent>
        </SubpageContainer>
    );
}
