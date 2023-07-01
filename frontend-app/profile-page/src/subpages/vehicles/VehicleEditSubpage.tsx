import React, { useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { useParams } from 'react-router-dom';
import { VehicleService } from '@car-rental/shared/service';
import { VehiclePersistDTO, VehicleResponseDTO, ResponseData } from '@car-rental/shared/model';
import { VehicleForm, VehicleFormValues } from './components/vehicle_form/VehicleForm';
import { FileWithPreview } from '../../components/form/form-group/upload/Dropzone';

export function VehicleEditSubpage(): JSX.Element {
    const { vehicleId } = useParams<{ vehicleId: string }>();
    const [vehicleResponseDTO, setVehicleResponseDTO] = useState<VehicleResponseDTO | undefined>(undefined);

    useEffect(() => {
        VehicleService.getVehicleById(vehicleId).then((vehicleResp: VehicleResponseDTO) => {
            setVehicleResponseDTO(vehicleResp);
        });
    }, [vehicleId]);

    const updateVehicleForm = (
        vehiclePersistDTO: VehiclePersistDTO,
        vehicleImage: File
    ): Promise<ResponseData<VehicleResponseDTO>> => {
        return VehicleService.updateVehicleData(vehicleId, vehiclePersistDTO, vehicleImage);
    };

    const mapVehicleResponseToFormValues = (vehicleResponseDTO: VehicleResponseDTO): VehicleFormValues => {
        return {
            brand: vehicleResponseDTO.brand,
            model: vehicleResponseDTO.model,
            dailyFee: vehicleResponseDTO.dailyFee,
            registration: vehicleResponseDTO.registration,
            location: vehicleResponseDTO.location.id,
            vehicleStatus: vehicleResponseDTO.vehicleStatus.vehicleStatCode,
            bestOffer: vehicleResponseDTO.bestOffer,
            bodyType: vehicleResponseDTO.vehicleDetails.bodyType,
            fuelType: vehicleResponseDTO.vehicleDetails.fuelType,
            power: vehicleResponseDTO.vehicleDetails.power,
            gearbox: vehicleResponseDTO.vehicleDetails.gearbox,
            frontWheelDrive: vehicleResponseDTO.vehicleDetails.frontWheelDrive,
            doorsCount: vehicleResponseDTO.vehicleDetails.doorsNumber,
            seatsCount: vehicleResponseDTO.vehicleDetails.seatsNumber,
            color: vehicleResponseDTO.vehicleDetails.color,
            metallic: vehicleResponseDTO.vehicleDetails.metallic,
            description: vehicleResponseDTO.vehicleDetails.description,
            productionYear: vehicleResponseDTO.vehicleDetails.productionYear,
            vehicleImage: { name: vehicleResponseDTO.vehicleDetails.imageName } as FileWithPreview,
        };
    };

    return (
        <SubpageContainer>
            <SubpageHeader title={'Vehicle edit'} />
            <SubpageContent>
                {vehicleResponseDTO && (
                    <VehicleForm
                        onSubmitAction={updateVehicleForm}
                        vehicleDefaultValues={mapVehicleResponseToFormValues(vehicleResponseDTO)}
                        submitButtonValue={'Update'}
                        isDirtyCheckEnabled
                    />
                )}
            </SubpageContent>
        </SubpageContainer>
    );
}
