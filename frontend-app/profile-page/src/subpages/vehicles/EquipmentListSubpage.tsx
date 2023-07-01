import React, { useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { EquipmentService } from '@car-rental/shared/service';
import { EquipmentResponseDTO, Page } from '@car-rental/shared/model';
import { Table } from '../../components/table/Table';
import { Column } from 'react-table';
import { Button } from 'react-bootstrap';
import './EquipmentListSubpage.scss';
import { AddEquipmentModal } from './components/add_equipment_modal/AddEquipmentModal';

export interface EquipmentResponseExtDTO extends EquipmentResponseDTO {
    id: string;
}

export const mapEqpResponseToExt = (eqp: EquipmentResponseDTO) => {
    return {
        id: eqp.equipmentCode,
        ...eqp,
    };
};

export function EquipmentListSubpage(): JSX.Element {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [vehicleEquipments, setVehicleEquipments] = useState<EquipmentResponseExtDTO[]>([]);

    const fetchData = React.useCallback(
        (pageIndex?: number, pageSize?: number, filter?: string, sortBy?: string, desc?: boolean): Promise<void> => {
            return EquipmentService.getAllEquipmentsList(pageIndex, pageSize, filter, sortBy, desc).then(
                (page: Page<EquipmentResponseDTO>) => {
                    setVehicleEquipments(page ? page.content.map(mapEqpResponseToExt) : []);
                    setTotalPages(page ? page.totalPages : 0);
                }
            );
        },
        []
    );

    const columns = React.useMemo<Column<EquipmentResponseExtDTO>[]>(
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
                <Table<EquipmentResponseExtDTO>
                    columns={columns}
                    data={vehicleEquipments}
                    fetchData={fetchData}
                    pageCount={totalPages}
                    // getRowId={(row: EquipmentResponseDTO) => row.equipmentCode}
                />
                <AddEquipmentModal isOpen={isOpen} setIsOpen={setIsOpen} reloadEquipments={fetchData} />
            </SubpageContent>
        </SubpageContainer>
    );
}
