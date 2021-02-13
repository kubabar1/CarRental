import React from 'react';
import { Link } from 'react-router-dom';
import VehicleResponseDTO from '../../../../../model/VehicleResponseDTO';

interface ReservationButtonProperties {
    vehicle: VehicleResponseDTO;
}

// TODO: Add link to reservation
export default function ReservationButton(props: ReservationButtonProperties) {
    const vehicle = props.vehicle;

    return (
        <section className="text-left">
            <h3 className="mt-2 ml-3 mb-4">Actions</h3>
            <Link
                to={{
                    pathname: '/CarRental/reservation/data',
                    state: {
                        selectedCar: vehicle.id,
                        selectedCity: vehicle.location,
                    },
                }}
                className="linkstyle btn btn-success px-5 py-2 ml-3"
            >
                Reserve
            </Link>
        </section>
    );
}
