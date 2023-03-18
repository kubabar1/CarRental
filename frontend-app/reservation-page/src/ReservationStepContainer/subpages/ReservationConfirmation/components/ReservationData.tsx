import React from 'react';
import LocalisationResponseDTO from '../../../../model/LocalisationResponseDTO';
import { getAllLocationsList } from '../../../../service/LocationService';
import { LocalisationsResponseDTO } from '../../../../model/LocalisationsResponseDTO';

interface ReservationConfirmationProperties {
    renderFormGroupItem: (label: string, value: string) => JSX.Element;
    selectedLocalisationId: string;
    receptionDate: string;
    returnDate: string;
}

export function ReservationData({
    renderFormGroupItem,
    selectedLocalisationId,
    receptionDate,
    returnDate,
}: ReservationConfirmationProperties): JSX.Element {
    const [localisations, setLocalisations] = React.useState<LocalisationResponseDTO[]>([]);
    const selectedLocation: LocalisationResponseDTO | undefined = localisations.find(
        (l) => l.id == selectedLocalisationId
    );

    React.useEffect(() => {
        getAllLocationsList().then((localisations: LocalisationsResponseDTO) => {
            setLocalisations(localisations.locations);
        });
    }, []);

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
