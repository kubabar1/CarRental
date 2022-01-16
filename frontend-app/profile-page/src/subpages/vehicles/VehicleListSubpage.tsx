import React, { useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { VehicleResponseDTO } from '../../model/VehicleResponseDTO';
import { getVehiclesList } from '../../service/VehicleService';
import { ButtonTableItem } from '../../components/table/tab_items/ButtonTableItem';

export function VehicleListSubpage(): JSX.Element {
    const [vehiclesList, setVehiclesList] = useState<VehicleResponseDTO[]>([]);

    useEffect(() => {
        getVehiclesList().then((vehiclesListResponse: VehicleResponseDTO[]) => {
            setVehiclesList(vehiclesListResponse);
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
            {
                Header: 'Edit',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) =>
                    ButtonTableItem('Edit', `/vehicles/${vehicleResponseDTO.id}/edit`, 'success'),
            },
            {
                Header: 'Equipment',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) =>
                    ButtonTableItem('Equipment', `/vehicles/${vehicleResponseDTO.id}/equipment`, 'info'),
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Vehicles list'} />
            <SubpageContent>
                <Table<VehicleResponseDTO> columns={columns} data={vehiclesList} />
            </SubpageContent>
        </SubpageContainer>
    );
}
