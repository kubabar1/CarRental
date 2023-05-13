import { FilterProps } from 'react-table';
import React from 'react';
import { SelectColumnFilter } from '../select_column_filter/SelectColumnFilter';
import { getAllLocationsList } from '../../../../../../main-page/src/service/LocationService';
import { LocalisationsResponseDTO } from '../../../../../../main-page/src/model/LocalisationsResponseDTO';
import LocalisationResponseDTO from '../../../../../../main-page/src/model/LocalisationResponseDTO';

export function LocationSelectColumnFilter<D extends object>(filterProps: FilterProps<D>) {
    const [locations, setLocations] = React.useState<LocalisationResponseDTO[]>([]);

    React.useEffect(() => {
        getAllLocationsList().then((locationsResponse: LocalisationsResponseDTO) => {
            setLocations(locationsResponse.locations);
        });
    }, []);

    return (
        <SelectColumnFilter
            options={locations.map((location: LocalisationResponseDTO) => {
                return {
                    value: `${location.id}`,
                    label: `${location.country}, ${location.city}, ${location.streetAndNb}`,
                };
            })}
            {...filterProps}
        />
    );
}
