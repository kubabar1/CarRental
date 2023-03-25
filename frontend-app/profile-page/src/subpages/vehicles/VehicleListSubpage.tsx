import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { VehicleResponseDTO } from '../../model/VehicleResponseDTO';
import { getVehiclesList } from '../../service/VehicleService';
import { ButtonTableItem } from '../../components/table/tab_items/ButtonTableItem';
import Page from '../../../../main-page/src/model/Page';

export function VehicleListSubpage(): JSX.Element {
    const [vehiclesPage, setVehiclesPage] = useState<Page<VehicleResponseDTO> | undefined>(undefined);

    const fetchData = React.useCallback((pageIndex, pageSize) => {
        getVehiclesList(pageIndex, pageSize).then((page: Page<VehicleResponseDTO>) => {
            setVehiclesPage(page);
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
            {
                Header: 'Edit',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => (
                    <ButtonTableItem
                        buttonText={'Edit'}
                        buttonVariant={'success'}
                        buttonRedirectPath={`/profile/vehicles/${vehicleResponseDTO.id}/edit`}
                    />
                ),
            },
            {
                Header: 'Equipment',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => (
                    <ButtonTableItem
                        buttonText={'Equipment'}
                        buttonVariant={'info'}
                        buttonRedirectPath={`/profile/vehicles/${vehicleResponseDTO.id}/equipment`}
                    />
                ),
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Vehicles list'} />
            <SubpageContent>
                <Table<VehicleResponseDTO>
                    columns={columns}
                    data={vehiclesPage ? vehiclesPage.content : []}
                    fetchData={fetchData}
                    pageCount={vehiclesPage?.totalPages}
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
