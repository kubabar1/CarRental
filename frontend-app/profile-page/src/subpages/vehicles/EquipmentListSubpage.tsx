import React, { useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { useParams } from 'react-router-dom';
import { getAllEquipmentsList } from '../../service/EquipmentService';
import { EquipmentResponseDTO } from '../../model/EquipmentResponseDTO';
import { Table } from '../../components/table/Table';
import { Column } from 'react-table';

export function EquipmentListSubpage(): JSX.Element {
    const { vehicleId } = useParams<{ vehicleId: string }>();
    const [vehicleEquipments, setVehicleEquipments] = useState<EquipmentResponseDTO[] | undefined>(undefined);

    useEffect(() => {
        getAllEquipmentsList().then((vehicleEquipmentsResponse: EquipmentResponseDTO[]) => {
            setVehicleEquipments(vehicleEquipmentsResponse);
        });
    }, [vehicleId]);

    const columns = React.useMemo<Column<EquipmentResponseDTO>[]>(
        () => [
            {
                Header: 'Code',
                accessor: 'equipmentCode',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Equipments list'} />
            <SubpageContent>
                {vehicleEquipments && <Table<EquipmentResponseDTO> columns={columns} data={vehicleEquipments} />}
            </SubpageContent>
        </SubpageContainer>
    );
}
