import { FilterProps } from 'react-table';
import React from 'react';
import { SelectColumnFilter } from '../select_column_filter/SelectColumnFilter';
import { LocationService } from '@car-rental/shared/service';
import { LocalisationResponseDTO, LocalisationsResponseDTO } from '@car-rental/shared/model';

export function LocationSelectColumnFilter<D extends object>(filterProps: FilterProps<D>) {
    const [locations, setLocations] = React.useState<LocalisationResponseDTO[]>([]);

    React.useEffect(() => {
        LocationService.getAllLocationsList().then((locationsResponse: LocalisationsResponseDTO) => {
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
