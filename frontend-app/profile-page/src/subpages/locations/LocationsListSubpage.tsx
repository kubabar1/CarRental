import React, { useEffect, useState } from 'react';
import { getLocationsList } from '../../service/LocationService';
import { Column } from 'react-table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Table } from '../../components/table/Table';
import { LocationResponseDTO } from '../../model/LocationResponseDTO';

export function LocationsListSubpage(): JSX.Element {
    const [locationsList, setLocationsList] = useState<LocationResponseDTO[]>([]);

    useEffect(() => {
        getLocationsList().then((locationsListResponse: LocationResponseDTO[]) => {
            setLocationsList(locationsListResponse);
        });
    }, []);

    const columns = React.useMemo<Column<LocationResponseDTO>[]>(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Country',
                accessor: 'country',
            },
            {
                Header: 'City',
                accessor: 'city',
            },
            {
                Header: 'Address',
                accessor: 'streetAndNb',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Phone',
                accessor: 'phone',
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Locations list'} />
            <SubpageContent>
                <Table<LocationResponseDTO> columns={columns} data={locationsList} />
            </SubpageContent>
        </SubpageContainer>
    );
}
