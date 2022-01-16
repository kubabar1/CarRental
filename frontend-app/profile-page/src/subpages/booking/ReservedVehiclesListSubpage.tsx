import React, { useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { getUnavailableVehiclesList } from '../../service/VehicleService';
import { VehicleResponseDTO } from '../../model/VehicleResponseDTO';

export function ReservedVehiclesListSubpage(): JSX.Element {
    const [unavailableVehiclesList, setUnavailableVehiclesList] = useState<VehicleResponseDTO[]>([]);

    useEffect(() => {
        getUnavailableVehiclesList().then((bookingsListResponse: VehicleResponseDTO[]) => {
            setUnavailableVehiclesList(bookingsListResponse);
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
                accessor: 'location',
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
                accessor: 'bodyType',
            },
            {
                Header: 'Fuel type',
                accessor: 'fuelType',
            },
            {
                Header: 'Power',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => `${vehicleResponseDTO.power} HP`,
            },
            {
                Header: 'Production year',
                accessor: 'productionYear',
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Reserved vehicles list'} />
            <SubpageContent>
                <Table<VehicleResponseDTO> columns={columns} data={unavailableVehiclesList} />
            </SubpageContent>
        </SubpageContainer>
    );
}
