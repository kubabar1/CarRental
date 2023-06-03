import React, { useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { getAllEquipmentsList } from '../../service/EquipmentService';
import { EquipmentResponseDTO } from '../../model/EquipmentResponseDTO';
import { Table } from '../../components/table/Table';
import { Column } from 'react-table';
import Page from '../../../../main-page/src/model/Page';
import { Button } from 'react-bootstrap';
import './EquipmentListSubpage.scss';
import { AddEquipmentModal } from './components/add_equipment_modal/AddEquipmentModal';

export function EquipmentListSubpage(): JSX.Element {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [vehicleEquipmentsPage, setVehicleEquipmentsPage] = useState<Page<EquipmentResponseDTO> | undefined>(
        undefined
    );

    const fetchData = React.useCallback(
        (pageIndex: number, pageSize: number, filter?: string, sortBy?: string, desc?: boolean): Promise<void> => {
            return getAllEquipmentsList(pageIndex, pageSize, filter, sortBy, desc).then(
                (page: Page<EquipmentResponseDTO>) => {
                    setVehicleEquipmentsPage(page);
                }
            );
        },
        []
    );

    const columns = React.useMemo<Column<EquipmentResponseDTO>[]>(
        () => [
            {
                id: 'equipmentCode',
                Header: 'Code',
                accessor: 'equipmentCode',
            },
            {
                id: 'description',
                Header: 'Description',
                accessor: 'description',
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Equipments'} />
            <SubpageContent>
                <div className="add-equipment-button-container">
                    <Button onClick={() => setIsOpen(true)}>Add</Button>
                </div>
                <Table<EquipmentResponseDTO>
                    columns={columns}
                    data={vehicleEquipmentsPage ? vehicleEquipmentsPage.content : []}
                    fetchData={fetchData}
                    pageCount={vehicleEquipmentsPage?.totalPages}
                    getRowId={(row: EquipmentResponseDTO) => row.equipmentCode}
                />
                <AddEquipmentModal isOpen={isOpen} setIsOpen={setIsOpen} reloadEquipments={fetchData} />
            </SubpageContent>
        </SubpageContainer>
    );
}
