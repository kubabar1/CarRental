import React from 'react';
import { carImagesMainPageCarList } from '../../../../../../constants/PathsServer';
import './VehicleItem.scss';
import { VehicleResponseDTO } from '../../../../../../model/VehicleResponseDTO';

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
    const vehicleImage: string = carImagesMainPageCarList(vehicle.vehicleDetails.imageName);

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
                    <button
                        className="btn btn-lg btn-secondary btn-block"
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            setModalVehicleDetailsId(vehicle.id);
                        }}
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
}
