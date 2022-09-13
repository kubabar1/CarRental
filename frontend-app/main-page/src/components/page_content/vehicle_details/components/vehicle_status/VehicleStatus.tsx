import React from 'react';
import { VehicleResponseDTO } from '../../../../../model/VehicleResponseDTO';
import VehicleStatCodeEnum from '../../../../../model/VehicleStatCodeEnum';
import './VehicleStatus.scss';

interface CarStatusProperties {
    vehicle: VehicleResponseDTO;
}

export function VehicleStatus(props: CarStatusProperties): JSX.Element {
    const vehicle: VehicleResponseDTO = props.vehicle;

    const colorClassName =
        vehicle.vehicleStatus.vehicleStatCode === VehicleStatCodeEnum.AVI ? 'bg-success' : 'bg-danger';

    return (
        <section>
            <div className="text-left">
                <h3 className="mt-2 ml-3 mb-4">Car state</h3>
            </div>
            <div
                className={
                    'vehicle-status-description card text-white ml-3 mt-5 mb-3 text-center col-md-3 ' + colorClassName
                }
            >
                <div>
                    <h5>{vehicle.vehicleStatus.description ? vehicle.vehicleStatus.description : 'Unknown'}</h5>
                </div>
            </div>
        </section>
    );
}
