import React from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { getUnavailableVehiclesList } from '../../service/VehicleService';
import { VehicleResponseDTO } from '../../model/VehicleResponseDTO';
import Page from '../../../../main-page/src/model/Page';

export function ReservedVehiclesListSubpage(): JSX.Element {
    const [unavailableVehiclesPage, setUnavailableVehiclesPage] = React.useState<Page<VehicleResponseDTO> | undefined>(
        undefined
    );

    const fetchData = React.useCallback((pageIndex, pageSize) => {
        getUnavailableVehiclesList(pageIndex, pageSize).then((page: Page<VehicleResponseDTO>) => {
            setUnavailableVehiclesPage(page);
        });
    }, []);

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
                <Table<VehicleResponseDTO>
                    columns={columns}
                    data={unavailableVehiclesPage ? unavailableVehiclesPage.content : []}
                    fetchData={fetchData}
                    pageCount={unavailableVehiclesPage?.totalPages}
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
