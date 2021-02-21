import React from 'react';
import VehicleResponseDTO from '../../../../model/VehicleResponseDTO';
import { carImagesMainPageCarList } from '../../../../constants/PathsServer';
import './CarItem.scss';

interface CarItemProperties {
    vehicle: VehicleResponseDTO;
    selected: boolean;
    selectCar: (carId: number) => void;
}

export function CarItem(props: CarItemProperties) {
    const vehicleImage: string = carImagesMainPageCarList(props.vehicle.vehicleParameters.photoName);

    return (
        <div
            id={props.vehicle.id.toString()}
            className="col-xl-3 col-lg-4 col-md-6"
            onClick={() => props.selectCar(props.vehicle.id)}
        >
            <div
                className={
                    'car-single-item-reservation container card card-body shadow mx-4 my-3 text-center ' +
                    (props.selected ? 'selected-car' : '')
                }
            >
                <h5 className="mb-2">
                    {props.vehicle.brand} {props.vehicle.model}
                </h5>
                <div
                    className="car-img-container"
                    style={{
                        backgroundImage: `url(${vehicleImage})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                />
                <div className="text-center">
                    <h3 className="mt-3">${props.vehicle.dailyFee}</h3>
                </div>
            </div>
        </div>
    );
}
