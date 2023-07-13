import React from 'react';
import { LocalisationResponseDTO } from '@car-rental/shared/model';
import { TranslationService } from '@car-rental/shared/service';

interface ReservationConfirmationProperties {
    renderFormGroupItem: (label: string, value: string) => JSX.Element;
    receptionDate: string;
    returnDate: string;
    selectedLocation: LocalisationResponseDTO | undefined;
}

export function ReservationData({
    renderFormGroupItem,
    selectedLocation,
    receptionDate,
    returnDate,
}: ReservationConfirmationProperties): JSX.Element {
    return (
        <div>
            <h3>{TranslationService.translate('reservationDataCardHeader')}</h3>
            <hr />
            <div>
                {selectedLocation &&
                    renderFormGroupItem(
                        TranslationService.translate('localisationReservationDataCardItem'),
                        `${selectedLocation.country}, ${selectedLocation.city} ${selectedLocation.streetAndNb}, ${selectedLocation.code}`
                    )}
                {renderFormGroupItem(
                    TranslationService.translate('receptionDateReservationDataCardItem'),
                    `${receptionDate}`
                )}
                {renderFormGroupItem(
                    TranslationService.translate('returnDateReservationDataCardItem'),
                    `${returnDate}`
                )}
            </div>
        </div>
    );
}
