import React, { useEffect } from 'react';
import Select, { MultiValue } from 'react-select';
import './VehicleAddEquipment.scss';
import { Button } from 'react-bootstrap';
import {
    addEquipmentsToVehicle,
    getAllEquipmentsList,
    getVehicleEquipmentList,
} from '../../../../service/EquipmentService';
import { EquipmentResponseDTO } from '../../../../model/EquipmentResponseDTO';

type VehicleAddEquipmentSelectOption = { value: string; label: string };

interface VehicleAddEquipmentInterface {
    vehicleId: string;
    currentVehicleEquipments: EquipmentResponseDTO[];
    setVehicleEquipments: React.Dispatch<React.SetStateAction<EquipmentResponseDTO[] | undefined>>;
}

export const VehicleAddEquipment = ({
    vehicleId,
    currentVehicleEquipments,
    setVehicleEquipments,
}: VehicleAddEquipmentInterface): JSX.Element => {
    const [allPossibleEquipments, setAllPossibleEquipments] = React.useState<VehicleAddEquipmentSelectOption[]>([]);
    const [equipmentsToAddList, setEquipmentsToAddList] = React.useState<VehicleAddEquipmentSelectOption[]>([]);

    useEffect(() => {
        getAllEquipmentsList().then((allEquipmentsResponse: EquipmentResponseDTO[]) => {
            setAllPossibleEquipments(
                allEquipmentsResponse
                    .filter((item: EquipmentResponseDTO) => !currentVehicleEquipments.includes(item))
                    .map(mapResponseToSelectOptions)
            );
        });
    }, [currentVehicleEquipments]);

    const mapResponseToSelectOptions = (
        equipmentResponseDTO: EquipmentResponseDTO
    ): VehicleAddEquipmentSelectOption => {
        return { value: equipmentResponseDTO.code, label: equipmentResponseDTO.description };
    };

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
                    onClick={() => {
                        addEquipmentsToVehicle(
                            vehicleId,
                            equipmentsToAddList.map((vehicle: VehicleAddEquipmentSelectOption) => vehicle.value)
                        );
                        getVehicleEquipmentList(vehicleId).then((vehicleEquipmentsResponse: EquipmentResponseDTO[]) => {
                            setVehicleEquipments(vehicleEquipmentsResponse);
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
