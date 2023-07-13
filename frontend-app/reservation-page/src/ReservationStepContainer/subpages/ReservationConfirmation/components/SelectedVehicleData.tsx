import React from 'react';
import { VehicleResponseDTO } from '@car-rental/shared/model';
import { TranslationService } from '@car-rental/shared/service';

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
            <h3>{TranslationService.translate('selectedVehicleDataHeader')}</h3>
            <hr />
            <div>
                {selectedVehicle &&
                    renderFormGroupItem(
                        TranslationService.translate('brandSelectedVehicleData'),
                        selectedVehicle.brand
                    )}
                {selectedVehicle &&
                    renderFormGroupItem(
                        TranslationService.translate('modelSelectedVehicleData'),
                        selectedVehicle.model
                    )}
                {selectedVehicle &&
                    renderFormGroupItem(
                        TranslationService.translate('dailyFeeSelectedVehicleData'),
                        `${selectedVehicle.dailyFee} $`
                    )}
            </div>
        </div>
    );
}
