import React, { useEffect, useState } from 'react';
import { getLocationsList } from '../../service/LocationService';
import { Column } from 'react-table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Table } from '../../components/table/Table';
import { LocationResponseDTO } from '../../model/LocationResponseDTO';
import { SubpagePagination } from '../../components/subpage/pagination/SubpagePagination';
import { useLocation } from 'react-router-dom';
import { getCountFromUrl, getPageFromUrl } from '../../../../main-page/src/utils/UrlUtil';
import Page from '../../../../main-page/src/model/Page';

export function LocationsListSubpage(): JSX.Element {
    const location = useLocation();
    const DEFAULT_PER_PAGE_COUNT = 10;
    const page: number = getPageFromUrl(location.search);
    const count: number = getCountFromUrl(location.search);

    const [perPageCount, setPerPageCount] = useState<number>(count <= 0 ? DEFAULT_PER_PAGE_COUNT : count);
    const [currentPage, setCurrentPage] = useState<number>(page);
    const [locationsList, setLocationsList] = useState<Page<LocationResponseDTO> | undefined>(undefined);
    const [totalPagesCount, setTotalPagesCount] = useState<number>(0);

    useEffect(() => {
        getLocationsList(currentPage, perPageCount).then((locationsListResponse: Page<LocationResponseDTO>) => {
            if (currentPage > locationsListResponse.totalPages) {
                setCurrentPage(locationsListResponse.totalPages - 1);
            } else {
                setLocationsList(locationsListResponse);
                setTotalPagesCount(locationsListResponse.totalPages);
            }
        });
    }, [currentPage, perPageCount]);

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
                {locationsList && <Table<LocationResponseDTO> columns={columns} data={locationsList.content} />}
            </SubpageContent>
            <SubpagePagination
                totalPagesCount={totalPagesCount}
                perPageCount={perPageCount}
                setPerPageCount={setPerPageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </SubpageContainer>
    );
}
