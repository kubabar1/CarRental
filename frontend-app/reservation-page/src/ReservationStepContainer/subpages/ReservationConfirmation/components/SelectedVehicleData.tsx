import React from 'react';
import { VehicleResponseDTO } from '@car-rental/shared/model';

interface ReservationConfirmationProperties {
    renderFormGroupItem: (label: string, value: string) => JSX.Element;
    selectedVehicle: VehicleResponseDTO | undefined;
}

export function SelectedVehicleData({
    renderFormGroupItem,
    selectedVehicle,
}: ReservationConfirmationProperties): JSX.Element {
    return (
        <div>
            <h3>{'Selected vehicle'}</h3>
            <hr />
            <div>
                {selectedVehicle && renderFormGroupItem('Brand: ', selectedVehicle.brand)}
                {selectedVehicle && renderFormGroupItem('Model: ', selectedVehicle.model)}
                {selectedVehicle && renderFormGroupItem('Daily fee: ', `${selectedVehicle.dailyFee} $`)}
            </div>
        </div>
    );
}
