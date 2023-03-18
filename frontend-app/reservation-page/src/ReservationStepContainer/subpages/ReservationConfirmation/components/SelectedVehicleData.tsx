import React from 'react';
import { VehicleResponseDTO } from '../../../../model/VehicleResponseDTO';
import { getAvailableVehiclesByLocation } from '../../../../service/VehicleService';

interface ReservationConfirmationProperties {
    renderFormGroupItem: (label: string, value: string) => JSX.Element;
    selectedLocalisationId: string;
    selectedVehicleId: string;
}

export function SelectedVehicleData({
    renderFormGroupItem,
    selectedLocalisationId,
    selectedVehicleId,
}: ReservationConfirmationProperties): JSX.Element {
    const [vehicles, setVehicles] = React.useState<VehicleResponseDTO[]>([]);
    const selectedVehicle: VehicleResponseDTO | undefined = vehicles.find((v) => v.id === selectedVehicleId);

    React.useEffect(() => {
        if (selectedLocalisationId) {
            getAvailableVehiclesByLocation(selectedLocalisationId).then((v: VehicleResponseDTO[]) => {
                setVehicles(v);
            });
        }
    }, [selectedLocalisationId]);

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
