import React, { useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { useLocation } from 'react-router-dom';
import { getAllEquipmentsList } from '../../service/EquipmentService';
import { EquipmentResponseDTO } from '../../model/EquipmentResponseDTO';
import { Table } from '../../components/table/Table';
import { Column } from 'react-table';
import { getCountFromUrl, getPageFromUrl } from '../../../../main-page/src/utils/UrlUtil';
import Page from '../../../../main-page/src/model/Page';
import { SubpagePagination } from '../../components/subpage/pagination/SubpagePagination';
import { Button } from 'react-bootstrap';
import './EquipmentListSubpage.scss';
import { AddEquipmentModal } from './components/add_equipment_modal/AddEquipmentModal';

export function EquipmentListSubpage(): JSX.Element {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const location = useLocation();
    const DEFAULT_PER_PAGE_COUNT = 10;
    const page: number = getPageFromUrl(location.search);
    const count: number = getCountFromUrl(location.search);

    const [perPageCount, setPerPageCount] = useState<number>(count <= 0 ? DEFAULT_PER_PAGE_COUNT : count);
    const [currentPage, setCurrentPage] = useState<number>(page);
    const [vehicleEquipments, setVehicleEquipments] = useState<Page<EquipmentResponseDTO> | undefined>(undefined);
    const [totalPagesCount, setTotalPagesCount] = useState<number>(0);

    useEffect(() => {
        loadEquipments();
    }, [currentPage, perPageCount]);

    const loadEquipments = (): void => {
        getAllEquipmentsList(currentPage, perPageCount).then((vehicleEquipments: Page<EquipmentResponseDTO>) => {
            if (currentPage > vehicleEquipments.totalPages) {
                setCurrentPage(vehicleEquipments.totalPages - 1);
            } else {
                setVehicleEquipments(vehicleEquipments);
                setTotalPagesCount(vehicleEquipments.totalPages);
            }
        });
    };

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
                <div className="add-equipment-button-container">
                    <Button onClick={() => setIsOpen(true)}>Add</Button>
                </div>
                {vehicleEquipments && (
                    <Table<EquipmentResponseDTO> columns={columns} data={vehicleEquipments.content} />
                )}
                <AddEquipmentModal isOpen={isOpen} setIsOpen={setIsOpen} reloadEquipments={loadEquipments} />
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
