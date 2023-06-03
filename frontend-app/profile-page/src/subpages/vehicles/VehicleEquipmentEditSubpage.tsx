import React, { useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { useParams } from 'react-router-dom';
import { getAllEquipmentsNotAssignedToVehicleList, removeEquipmentFromVehicle } from '../../service/EquipmentService';
import { EquipmentResponseDTO } from '../../model/EquipmentResponseDTO';
import { Table } from '../../components/table/Table';
import { Column } from 'react-table';
import { ButtonTableItem } from '../../components/table/tab_items/button_table_item/ButtonTableItem';
import { VehicleDetails } from './components/vehicle_details/VehicleDetails';
import { getVehicleById } from '../../service/VehicleService';
import { VehicleResponseDTO } from '../../model/VehicleResponseDTO';
import { VehicleAddEquipment } from './components/vehicle_add_equipment/VehicleAddEquipment';

export function VehicleEquipmentEditSubpage(): JSX.Element {
    const { vehicleId } = useParams<{ vehicleId: string }>();
    const [vehicle, setVehicle] = useState<VehicleResponseDTO | undefined>(undefined);
    const [allPossibleEquipments, setAllPossibleEquipments] = useState<EquipmentResponseDTO[]>([]);

    const fetchData = React.useCallback((): Promise<void> => {
        return getAllEquipmentsNotAssignedToVehicleList(vehicleId).then(
            (equipmentsResponse: EquipmentResponseDTO[]) => {
                setAllPossibleEquipments(equipmentsResponse);
            }
        );
    }, [vehicleId]);

    useEffect(() => {
        getVehicleById(vehicleId).then((vehicleResp: VehicleResponseDTO) => {
            setVehicle(vehicleResp);
        });
    }, [vehicleId]);

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
            {
                id: 'removeAction',
                Header: 'Remove',
                accessor: (equipmentResponseDTO: EquipmentResponseDTO) => (
                    <ButtonTableItem
                        buttonText={'Remove'}
                        buttonVariant={'danger'}
                        onClickAction={() =>
                            removeEquipmentFromVehicle(vehicleId, equipmentResponseDTO.equipmentCode).then(
                                (vehicleResp: VehicleResponseDTO) => {
                                    setVehicle(vehicleResp);
                                    getAllEquipmentsNotAssignedToVehicleList(vehicleId).then(
                                        (equipmentsResponse: EquipmentResponseDTO[]) => {
                                            setAllPossibleEquipments(equipmentsResponse);
                                        }
                                    );
                                }
                            )
                        }
                    />
                ),
            },
        ],
        [vehicleId]
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Vehicle equipment edit'} />
            <SubpageContent>
                <h5 className={'mb-4 font-weight-bold'}>Vehicle details</h5>
                {vehicle && <VehicleDetails vehicleResponseDTO={vehicle} />}
                <h5 className={'mt-4 mb-4 font-weight-bold'}>Vehicle add equipment</h5>
                {vehicle && (
                    <VehicleAddEquipment
                        vehicleId={vehicleId}
                        setVehicle={setVehicle}
                        allPossibleEquipments={allPossibleEquipments}
                        setAllPossibleEquipments={setAllPossibleEquipments}
                    />
                )}
                <h5 className={'mt-4 mb-4 font-weight-bold'}>Vehicle equipment</h5>
                {vehicle && (
                    <Table<EquipmentResponseDTO>
                        columns={columns}
                        data={vehicle.equipments}
                        fetchData={fetchData}
                        getRowId={(row: EquipmentResponseDTO) => row.equipmentCode}
                    />
                )}
            </SubpageContent>
        </SubpageContainer>
    );
}
