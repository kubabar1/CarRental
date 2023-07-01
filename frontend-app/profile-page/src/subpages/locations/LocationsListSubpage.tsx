import React, { useState } from 'react';
import { getLocationsList } from '@car-rental/shared/service';
import { Column } from 'react-table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Table } from '../../components/table/Table';
import { LocalisationResponseDTO, Page } from '@car-rental/shared/model';

export function LocationsListSubpage(): JSX.Element {
    const [locationsPage, setLocationsPage] = useState<Page<LocalisationResponseDTO> | undefined>(undefined);

    const fetchData = React.useCallback((pageIndex, pageSize, filter, sortBy, desc): Promise<void> => {
        return getLocationsList(pageIndex, pageSize, filter, sortBy, desc).then(
            (page: Page<LocalisationResponseDTO>) => {
                setLocationsPage(page);
            }
        );
    }, []);

    const columns = React.useMemo<Column<LocalisationResponseDTO>[]>(
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
            <SubpageHeader title={'Locations'} />
            <SubpageContent>
                <Table<LocalisationResponseDTO>
                    columns={columns}
                    data={locationsPage ? locationsPage.content : []}
                    fetchData={fetchData}
                    pageCount={locationsPage?.totalPages}
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
