import React from 'react';
import { VehicleResponseDTO } from '@car-rental/shared/model';
import { Button } from 'react-bootstrap';
import { TranslationService } from '@car-rental/shared/service';
import { reservationPath } from '@car-rental/shared/constant';

interface ReservationButtonProperties {
    vehicle: VehicleResponseDTO;
}

export default function ReservationButton(props: ReservationButtonProperties): JSX.Element {
    const vehicle = props.vehicle;

    return (
        <section className="text-left">
            <h3 className="mt-2 ml-3 mb-4">{TranslationService.translate('actionsHeader')}</h3>
            <Button
                onClick={() => {
                    window.location.replace(
                        `${reservationPath}?localisationId=${vehicle.location}&vehicleId=${vehicle.id}`
                    );
                }}
                className="linkstyle btn btn-success px-5 py-2 ml-3"
            >
                Reserve
            </Button>
        </section>
    );
}
