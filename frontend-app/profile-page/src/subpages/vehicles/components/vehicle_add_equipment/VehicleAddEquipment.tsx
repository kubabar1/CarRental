import React from 'react';
import Select, { MultiValue } from 'react-select';
import './VehicleAddEquipment.scss';
import { Button } from 'react-bootstrap';
import { addEquipmentsToVehicle, getAllEquipmentsNotAssignedToVehicleList } from '../../../../service/EquipmentService';
import { VehicleResponseDTO } from '../../../../model/VehicleResponseDTO';
import { EquipmentResponseDTO } from '../../../../model/EquipmentResponseDTO';

export type VehicleAddEquipmentSelectOption = { value: string; label: string };

interface VehicleAddEquipmentInterface {
    vehicleId: string;
    allPossibleEquipments: EquipmentResponseDTO[];
    setVehicle: React.Dispatch<React.SetStateAction<VehicleResponseDTO | undefined>>;
    setAllPossibleEquipments: React.Dispatch<EquipmentResponseDTO[]>;
}

export const VehicleAddEquipment = ({
    vehicleId,
    allPossibleEquipments,
    setVehicle,
    setAllPossibleEquipments,
}: VehicleAddEquipmentInterface): JSX.Element => {
    const [equipmentsToAddList, setEquipmentsToAddList] = React.useState<VehicleAddEquipmentSelectOption[]>([]);

    const mapResponseToSelectOptions = (
        equipmentResponseDTO: EquipmentResponseDTO
    ): VehicleAddEquipmentSelectOption => {
        return { value: equipmentResponseDTO.equipmentCode, label: equipmentResponseDTO.description };
    };

    return (
        <div className={'vehicle-add-equipment-container'}>
            <div className={'select-container'}>
                <Select
                    value={equipmentsToAddList}
                    options={allPossibleEquipments.map(mapResponseToSelectOptions)}
                    isMulti
                    onChange={(equipments: MultiValue<VehicleAddEquipmentSelectOption>) => {
                        setEquipmentsToAddList(equipments as VehicleAddEquipmentSelectOption[]);
                    }}
                />
            </div>
            <div className={'add-button-container'}>
                <Button
                    variant={'success'}
                    disabled={!equipmentsToAddList.length}
                    onClick={() => {
                        addEquipmentsToVehicle(
                            vehicleId,
                            equipmentsToAddList.map((vehicle: VehicleAddEquipmentSelectOption) => vehicle.value)
                        ).then((vehicleResp: VehicleResponseDTO) => {
                            setVehicle(vehicleResp);
                            getAllEquipmentsNotAssignedToVehicleList(vehicleId).then(
                                (equipmentsResponse: EquipmentResponseDTO[]) => {
                                    setAllPossibleEquipments(equipmentsResponse);
                                }
                            );
                        });
                        setEquipmentsToAddList([]);
                    }}
                >
                    Add
                </Button>
            </div>
        </div>
    );
};
