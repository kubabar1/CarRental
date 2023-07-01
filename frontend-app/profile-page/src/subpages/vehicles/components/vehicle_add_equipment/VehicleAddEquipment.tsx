import React from 'react';
import Select, { MultiValue } from 'react-select';
import './VehicleAddEquipment.scss';
import { Button } from 'react-bootstrap';
import {
    addEquipmentsToVehicle,
    getAllEquipmentsNotAssignedToVehicleList,
    ResponseData,
} from '@car-rental/shared/service';
import { EquipmentResponseDTO, VehicleResponseDTO } from '@car-rental/shared/model';
import { EquipmentResponseExtDTO, mapEqpResponseToExt } from '../../VehicleEquipmentEditSubpage';

export type VehicleAddEquipmentSelectOption = { value: string; label: string };

interface VehicleAddEquipmentInterface {
    vehicleId: string;
    allPossibleEquipments: EquipmentResponseDTO[];
    setVehicle: React.Dispatch<React.SetStateAction<VehicleResponseDTO | undefined>>;
    setAllPossibleEquipments: React.Dispatch<EquipmentResponseExtDTO[]>;
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
                        ).then((vehicleResp: ResponseData<VehicleResponseDTO>) => {
                            setVehicle(vehicleResp.responseBody);
                            getAllEquipmentsNotAssignedToVehicleList(vehicleId).then(
                                (equipmentsResponse: EquipmentResponseDTO[]) => {
                                    setAllPossibleEquipments(equipmentsResponse.map(mapEqpResponseToExt));
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
