import React from 'react';
import { VehicleResponseDTO } from '@car-rental/shared/model';
import { STORAGE_SERVICE_ENDPOINTS } from '@car-rental/shared/constant';
import './VehicleDetails.scss';
import { TranslationService } from '@car-rental/shared/service';

export interface VehicleDetailsProperties {
    vehicleResponseDTO: VehicleResponseDTO;
}

export const VehicleDetails = ({ vehicleResponseDTO }: VehicleDetailsProperties): JSX.Element => {
    return (
        <div className={'vehicle-details'}>
            <div className={'vehicle-details-container'}>
                <div className={'vehicle-details-item-image'}>
                    <img
                        src={STORAGE_SERVICE_ENDPOINTS.VEHICLE_IMAGE(vehicleResponseDTO.vehicleDetails.imageName)}
                        alt="Vehicle image"
                        className="vehicle-details-image"
                    />
                </div>
                <div className={'vehicle-details-item-text'}>
                    <p>
                        <strong>{TranslationService.translate('idVehicleDetailsLabel')}</strong>
                        {vehicleResponseDTO.id}
                    </p>
                    <p>
                        <strong>{TranslationService.translate('brandVehicleDetailsLabel')}</strong>
                        {vehicleResponseDTO.brand}
                    </p>
                    <p>
                        <strong>{TranslationService.translate('modelVehicleDetailsLabel')}</strong>
                        {vehicleResponseDTO.model}
                    </p>
                    <p>
                        <strong>{TranslationService.translate('registrationVehicleDetailsLabel')}</strong>
                        {vehicleResponseDTO.registration}
                    </p>
                    <p>
                        <strong>{TranslationService.translate('locationVehicleDetailsLabel')}</strong>
                        {`${vehicleResponseDTO.location.country}, ${vehicleResponseDTO.location.city}, ${vehicleResponseDTO.location.streetAndNb}`}
                    </p>
                </div>
            </div>
        </div>
    );
};
