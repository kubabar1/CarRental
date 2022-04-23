import React, { useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { useParams } from 'react-router-dom';
import { getAllEquipmentsNotAssignedToVehicleList, removeEquipmentFromVehicle } from '../../service/EquipmentService';
import { EquipmentResponseDTO } from '../../model/EquipmentResponseDTO';
import { Table } from '../../components/table/Table';
import { Column } from 'react-table';
import { ButtonTableItem } from '../../components/table/tab_items/ButtonTableItem';
import { VehicleDetails } from './components/vehicle_details/VehicleDetails';
import { getVehicleById } from '../../service/VehicleService';
import { VehicleResponseDTO } from '../../model/VehicleResponseDTO';
import { VehicleAddEquipment } from './components/vehicle_add_equipment/VehicleAddEquipment';

export type VehicleAddEquipmentSelectOption = { value: string; label: string };

export function VehicleEquipmentEditSubpage(): JSX.Element {
    const { vehicleId } = useParams<{ vehicleId: string }>();
    const [vehicleResponseDTO, setVehicleResponseDTO] = useState<VehicleResponseDTO | undefined>(undefined);
    const [allPossibleEquipments, setAllPossibleEquipments] = useState<VehicleAddEquipmentSelectOption[]>([]);

    useEffect(() => {
        getVehicleById(vehicleId).then((vehicleResp: VehicleResponseDTO) => {
            setVehicleResponseDTO(vehicleResp);
        });
        getAllEquipmentsNotAssignedToVehicleList(vehicleId).then((equipmentsResponse: EquipmentResponseDTO[]) => {
            setAllPossibleEquipments(equipmentsResponse.map(mapResponseToSelectOptions));
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
            {
                Header: 'Remove',
                accessor: (equipmentResponseDTO: EquipmentResponseDTO) =>
                    ButtonTableItem('Remove', undefined, 'danger', () => {
                        removeEquipmentFromVehicle(vehicleId, equipmentResponseDTO.equipmentCode).then(
                            (vehicleResp: VehicleResponseDTO) => {
                                setVehicleResponseDTO(vehicleResp);
                                getAllEquipmentsNotAssignedToVehicleList(vehicleId).then(
                                    (equipmentsResponse: EquipmentResponseDTO[]) => {
                                        setAllPossibleEquipments(equipmentsResponse.map(mapResponseToSelectOptions));
                                    }
                                );
                            }
                        );
                    }),
            },
        ],
        [vehicleId]
    );

    const mapResponseToSelectOptions = (
        equipmentResponseDTO: EquipmentResponseDTO
    ): VehicleAddEquipmentSelectOption => {
        return { value: equipmentResponseDTO.equipmentCode, label: equipmentResponseDTO.description };
    };

    return (
        <SubpageContainer>
            <SubpageHeader title={'Vehicle equipment edit'} />
            <SubpageContent>
                <h5 className={'mb-4 font-weight-bold'}>Vehicle details</h5>
                {vehicleResponseDTO && <VehicleDetails vehicleResponseDTO={vehicleResponseDTO} />}
                <h5 className={'mt-4 mb-4 font-weight-bold'}>Vehicle add equipment</h5>
                {vehicleResponseDTO && (
                    <VehicleAddEquipment
                        vehicleId={vehicleId}
                        setVehicleResponseDTO={setVehicleResponseDTO}
                        allPossibleEquipments={allPossibleEquipments}
                        setAllPossibleEquipments={setAllPossibleEquipments}
                        mapResponseToSelectOptions={mapResponseToSelectOptions}
                    />
                )}
                <h5 className={'mt-4 mb-4 font-weight-bold'}>Vehicle equipment</h5>
                {vehicleResponseDTO && (
                    <Table<EquipmentResponseDTO> columns={columns} data={vehicleResponseDTO.equipments} />
                )}
            </SubpageContent>
        </SubpageContainer>
    );
}
