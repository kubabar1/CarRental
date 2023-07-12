import React, { useState } from 'react';
import { LocationService, TranslationService } from '@car-rental/shared/service';
import { Column } from 'react-table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Table } from '../../components/table/Table';
import { LocalisationResponseDTO, Page } from '@car-rental/shared/model';

export function LocationsListSubpage(): JSX.Element {
    const [locationsPage, setLocationsPage] = useState<Page<LocalisationResponseDTO> | undefined>(undefined);

    const fetchData = React.useCallback((pageIndex, pageSize, filter, sortBy, desc): Promise<void> => {
        return LocationService.getLocationsList(pageIndex, pageSize, filter, sortBy, desc).then(
            (page: Page<LocalisationResponseDTO>) => {
                setLocationsPage(page);
            }
        );
    }, []);

    const columns = React.useMemo<Column<LocalisationResponseDTO>[]>(
        () => [
            {
                Header: TranslationService.translate('idLocationSubpageColumn'),
                accessor: 'id',
            },
            {
                Header: TranslationService.translate('countryLocationSubpageColumn'),
                accessor: 'country',
            },
            {
                Header: TranslationService.translate('cityLocationSubpageColumn'),
                accessor: 'city',
            },
            {
                Header: TranslationService.translate('addressLocationSubpageColumn'),
                accessor: 'streetAndNb',
            },
            {
                Header: TranslationService.translate('emailLocationSubpageColumn'),
                accessor: 'email',
            },
            {
                Header: TranslationService.translate('phoneLocationSubpageColumn'),
                accessor: 'phone',
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={TranslationService.translate('locationSubpageTitle')} />
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
