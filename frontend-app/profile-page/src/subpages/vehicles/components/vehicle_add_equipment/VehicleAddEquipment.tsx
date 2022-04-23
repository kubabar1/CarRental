import React from 'react';
import Select, { MultiValue } from 'react-select';
import './VehicleAddEquipment.scss';
import { Button } from 'react-bootstrap';
import { addEquipmentsToVehicle, getAllEquipmentsNotAssignedToVehicleList } from '../../../../service/EquipmentService';
import { VehicleResponseDTO } from '../../../../model/VehicleResponseDTO';
import { VehicleAddEquipmentSelectOption } from '../../VehicleEquipmentEditSubpage';
import { EquipmentResponseDTO } from '../../../../model/EquipmentResponseDTO';

interface VehicleAddEquipmentInterface {
    vehicleId: string;
    allPossibleEquipments: VehicleAddEquipmentSelectOption[];
    setVehicleResponseDTO: React.Dispatch<React.SetStateAction<VehicleResponseDTO | undefined>>;
    mapResponseToSelectOptions: (equipmentResponseDTO: EquipmentResponseDTO) => VehicleAddEquipmentSelectOption;
    setAllPossibleEquipments: React.Dispatch<VehicleAddEquipmentSelectOption[]>;
}

export const VehicleAddEquipment = ({
    vehicleId,
    allPossibleEquipments,
    setVehicleResponseDTO,
    mapResponseToSelectOptions,
    setAllPossibleEquipments,
}: VehicleAddEquipmentInterface): JSX.Element => {
    const [equipmentsToAddList, setEquipmentsToAddList] = React.useState<VehicleAddEquipmentSelectOption[]>([]);

    return (
        <div className={'vehicle-add-equipment-container'}>
            <div className={'select-container'}>
                <Select
                    value={equipmentsToAddList}
                    options={allPossibleEquipments}
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
                            setVehicleResponseDTO(vehicleResp);
                            getAllEquipmentsNotAssignedToVehicleList(vehicleId).then(
                                (equipmentsResponse: EquipmentResponseDTO[]) => {
                                    setAllPossibleEquipments(equipmentsResponse.map(mapResponseToSelectOptions));
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
