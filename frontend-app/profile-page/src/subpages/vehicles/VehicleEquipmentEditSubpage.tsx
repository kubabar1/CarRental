import React, { useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { useParams } from 'react-router-dom';
import { EquipmentService, VehicleService } from '@car-rental/shared/service';
import { EquipmentResponseDTO, VehicleResponseDTO, ResponseData } from '@car-rental/shared/model';
import { Table } from '../../components/table/Table';
import { Column } from 'react-table';
import { ButtonTableItem } from '../../components/table/tab_items/button_table_item/ButtonTableItem';
import { VehicleDetails } from './components/vehicle_details/VehicleDetails';
import { VehicleAddEquipment } from './components/vehicle_add_equipment/VehicleAddEquipment';

export interface EquipmentResponseExtDTO extends EquipmentResponseDTO {
    id: string;
}

export const mapEqpResponseToExt = (eqp: EquipmentResponseDTO) => {
    return {
        id: eqp.equipmentCode,
        ...eqp,
    };
};

export function VehicleEquipmentEditSubpage(): JSX.Element {
    const { vehicleId } = useParams<{ vehicleId: string }>();
    const [vehicle, setVehicle] = useState<VehicleResponseDTO | undefined>(undefined);
    const [allPossibleEquipments, setAllPossibleEquipments] = useState<EquipmentResponseExtDTO[]>([]);

    const fetchData = React.useCallback((): Promise<void> => {
        return EquipmentService.getAllEquipmentsNotAssignedToVehicleList(vehicleId).then(
            (equipmentsResponse: EquipmentResponseDTO[]) => {
                setAllPossibleEquipments(equipmentsResponse.map(mapEqpResponseToExt));
            }
        );
    }, [vehicleId]);

    useEffect(() => {
        VehicleService.getVehicleById(vehicleId).then((vehicleResp: VehicleResponseDTO) => {
            setVehicle(vehicleResp);
        });
    }, [vehicleId]);

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
            {
                id: 'removeAction',
                Header: 'Remove',
                accessor: (equipmentResponseDTO: EquipmentResponseExtDTO) => (
                    <ButtonTableItem
                        buttonText={'Remove'}
                        buttonVariant={'danger'}
                        onClickAction={() =>
                            EquipmentService.removeEquipmentFromVehicle(
                                vehicleId,
                                equipmentResponseDTO.equipmentCode
                            ).then((vehicleResp: ResponseData<VehicleResponseDTO>) => {
                                setVehicle(vehicleResp.responseBody);
                                EquipmentService.getAllEquipmentsNotAssignedToVehicleList(vehicleId).then(
                                    (equipmentsResponse: EquipmentResponseDTO[]) => {
                                        setAllPossibleEquipments(equipmentsResponse.map(mapEqpResponseToExt));
                                    }
                                );
                            })
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
                    <Table<EquipmentResponseExtDTO>
                        columns={columns}
                        data={vehicle.equipments.map(mapEqpResponseToExt)}
                        fetchData={fetchData}
                        // getRowId={(row: EquipmentResponseExtDTO) => row.equipmentCode}
                    />
                )}
            </SubpageContent>
        </SubpageContainer>
    );
}
