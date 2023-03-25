import React, { useState } from 'react';
import { getLocationsList } from '../../service/LocationService';
import { Column } from 'react-table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Table } from '../../components/table/Table';
import { LocationResponseDTO } from '../../model/LocationResponseDTO';
import Page from '../../../../main-page/src/model/Page';

export function LocationsListSubpage(): JSX.Element {
    const [locationsPage, setLocationsPage] = useState<Page<LocationResponseDTO> | undefined>(undefined);

    const fetchData = React.useCallback((pageIndex, pageSize) => {
        getLocationsList(pageIndex, pageSize).then((page: Page<LocationResponseDTO>) => {
            setLocationsPage(page);
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
                <Table<LocationResponseDTO>
                    columns={columns}
                    data={locationsPage ? locationsPage.content : []}
                    fetchData={fetchData}
                    pageCount={locationsPage?.totalPages}
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
