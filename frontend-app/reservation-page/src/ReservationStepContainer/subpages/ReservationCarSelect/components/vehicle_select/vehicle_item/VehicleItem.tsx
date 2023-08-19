import React from 'react';
import './VehicleItem.scss';
import { VehicleResponseDTO } from '@car-rental/shared/model';
import { TranslationService } from '@car-rental/shared/service';
import { STORAGE_SERVICE_ENDPOINTS } from '@car-rental/shared/constant';

interface CarItemProperties {
    vehicle: VehicleResponseDTO;
    isSelected: boolean;
    onClick: () => void;
    setModalVehicleDetailsId: (vehicleId: string | undefined) => void;
}

export function VehicleItem({
    vehicle,
    isSelected,
    onClick,
    setModalVehicleDetailsId,
}: CarItemProperties): JSX.Element {
    const vehicleImage: string = STORAGE_SERVICE_ENDPOINTS.VEHICLE_IMAGE(vehicle.vehicleDetails.imageName);

    return (
        <div id={vehicle.id} className="col-md-6" onClick={onClick}>
            <div
                className={
                    'car-single-item-reservation container card card-body shadow my-3 text-center ' +
                    (isSelected ? 'selected-car' : '')
                }
            >
                <h5 className="mb-2 vehicle-item-header">
                    {vehicle.brand} {vehicle.model}
                </h5>
                <div className="car-img-container">
                    <div
                        className="car-img"
                        style={{
                            backgroundImage: `url(${vehicleImage})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                    />
                </div>
                <div className="vehicle-details-footer text-center row">
                    <h5>${vehicle.dailyFee}</h5>
                    <a
                        className="btn btn-lg btn-secondary"
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            setModalVehicleDetailsId(vehicle.id);
                        }}
                    >
                        {TranslationService.translate('vehicleItemDetailsButton')}
                    </a>
                </div>
            </div>
        </div>
    );
}
