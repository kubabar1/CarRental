import React from 'react';
import { LocalisationResponseDTO } from '@car-rental/shared/model';

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
            <h3>{'Reservation data'}</h3>
            <hr />
            <div>
                {selectedLocation &&
                    renderFormGroupItem(
                        'Location: ',
                        `${selectedLocation.country}, ${selectedLocation.city} ${selectedLocation.streetAndNb}, ${selectedLocation.code}`
                    )}
                {renderFormGroupItem('Reception date: ', `${receptionDate}`)}
                {renderFormGroupItem('Return date: ', `${returnDate}`)}
            </div>
        </div>
    );
}
