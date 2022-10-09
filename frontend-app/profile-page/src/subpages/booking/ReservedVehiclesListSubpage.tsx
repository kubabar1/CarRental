import React, { useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { getUnavailableVehiclesList } from '../../service/VehicleService';
import { VehicleResponseDTO } from '../../model/VehicleResponseDTO';
import { useLocation } from 'react-router-dom';
import { getCountFromUrl, getPageFromUrl } from '../../../../main-page/src/utils/UrlUtil';
import Page from '../../../../main-page/src/model/Page';
import { SubpagePagination } from '../../components/subpage/pagination/SubpagePagination';

export function ReservedVehiclesListSubpage(): JSX.Element {
    const location = useLocation();
    const DEFAULT_PER_PAGE_COUNT = 10;
    const page: number = getPageFromUrl(location.search);
    const count: number = getCountFromUrl(location.search);

    const [perPageCount, setPerPageCount] = useState<number>(count <= 0 ? DEFAULT_PER_PAGE_COUNT : count);
    const [currentPage, setCurrentPage] = useState<number>(page);
    const [unavailableVehiclesList, setUnavailableVehiclesList] = useState<Page<VehicleResponseDTO> | undefined>(
        undefined
    );
    const [totalPagesCount, setTotalPagesCount] = useState<number>(0);

    useEffect(() => {
        getUnavailableVehiclesList(currentPage, perPageCount).then((bookingsListResponse: Page<VehicleResponseDTO>) => {
            if (currentPage > bookingsListResponse.totalPages - 1) {
                setCurrentPage(bookingsListResponse.totalPages - 1);
            } else {
                setUnavailableVehiclesList(bookingsListResponse);
                setTotalPagesCount(bookingsListResponse.totalPages);
            }
        });
    }, [currentPage, perPageCount]);

    const columns = React.useMemo<Column<VehicleResponseDTO>[]>(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Brand',
                accessor: 'brand',
            },
            {
                Header: 'Model',
                accessor: 'model',
            },
            {
                Header: 'Daily fee',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => `${vehicleResponseDTO.dailyFee.toFixed(2)} $`,
            },
            {
                Header: 'Registration',
                accessor: 'registration',
            },
            {
                Header: 'Location',
                accessor: 'locationId',
            },
            {
                Header: 'Status',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => vehicleResponseDTO.vehicleStatus.description,
            },
            {
                Header: 'Best offer',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => (vehicleResponseDTO.bestOffer ? 'true' : 'false'),
            },
            {
                Header: 'Body type',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => vehicleResponseDTO.vehicleDetails.bodyType,
            },
            {
                Header: 'Fuel type',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => vehicleResponseDTO.vehicleDetails.fuelType,
            },
            {
                Header: 'Power',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => `${vehicleResponseDTO.vehicleDetails.power} HP`,
            },
            {
                Header: 'Production year',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => vehicleResponseDTO.vehicleDetails.productionYear,
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Reserved vehicles list'} />
            <SubpageContent>
                {unavailableVehiclesList && (
                    <Table<VehicleResponseDTO> columns={columns} data={unavailableVehiclesList.content} />
                )}
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
