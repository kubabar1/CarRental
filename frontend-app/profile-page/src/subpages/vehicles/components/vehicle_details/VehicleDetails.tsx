import React from 'react';
import { VehicleResponseDTO } from '../../../../model/VehicleResponseDTO';
import { carImagesProfilePage } from '../../../../constants/PathsServer';
import './VehicleDetails.scss';

export interface VehicleDetailsProperties {
    vehicleResponseDTO: VehicleResponseDTO;
}

export const VehicleDetails = ({ vehicleResponseDTO }: VehicleDetailsProperties): JSX.Element => {
    return (
        <div className={'vehicle-details'}>
            <div className={'vehicle-details-container'}>
                <div className={'vehicle-details-item-image'}>
                    <img
                        src={carImagesProfilePage('ford_mustang_example.jpg')}
                        alt="Vehicle image"
                        className="vehicle-details-image"
                    />
                </div>
                <div className={'vehicle-details-item-text'}>
                    <p>
                        <strong>ID: </strong>
                        {vehicleResponseDTO.id}
                    </p>
                    <p>
                        <strong>Brand: </strong>
                        {vehicleResponseDTO.brand}
                    </p>
                    <p>
                        <strong>Model: </strong>
                        {vehicleResponseDTO.model}
                    </p>
                    <p>
                        <strong>Registration: </strong>
                        {vehicleResponseDTO.registration}
                    </p>
                    <p>
                        <strong>Localisation: </strong>
                        {vehicleResponseDTO.locationId}
                    </p>
                </div>
            </div>
        </div>
    );
};
