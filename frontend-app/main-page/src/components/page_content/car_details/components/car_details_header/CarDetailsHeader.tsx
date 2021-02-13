import React from 'react';
import VehicleResponseDTO from '../../../../../model/VehicleResponseDTO';
import { carImagesMainPageCarList } from '../../../../../constants/PathsServer';
import './CarDetailsHeader.scss';

interface CarDetailsHeaderProperties {
    vehicle: VehicleResponseDTO;
}

export function CarDetailsHeader(props: CarDetailsHeaderProperties) {
    const vehicle: VehicleResponseDTO = props.vehicle;
    const vehicleImage: string = carImagesMainPageCarList(vehicle.vehicleParameters.photoName);

    return (
        <section>
            <div className="row">
                <h1 className="mt-2 ml-5">
                    {vehicle.brand} {vehicle.model}
                </h1>
                <div className="card bg-success text-white ml-auto mr-5">
                    <div className="card-body">
                        <h5>${vehicle.dailyFee}</h5>
                    </div>
                </div>
            </div>
            <div
                id="car-details-image"
                className="car-img-container shadow my-3 col-md-10 offset-md-1"
                style={{
                    backgroundImage: `url(${vehicleImage})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            />
        </section>
    );
}
