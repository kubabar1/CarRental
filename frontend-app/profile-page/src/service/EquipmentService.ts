import { EquipmentResponseDTO } from '../model/EquipmentResponseDTO';

const vehicleEquipments: EquipmentResponseDTO[] = [
    new EquipmentResponseDTO('ABS', 'ABS'),
    new EquipmentResponseDTO('AF', 'Alloy wheels'),
    new EquipmentResponseDTO('APS', 'Heated front seats'),
    new EquipmentResponseDTO('CB', 'CB Radio'),
    new EquipmentResponseDTO('CD', 'CD'),
    new EquipmentResponseDTO('CZ', 'Central locking'),
    new EquipmentResponseDTO('ESP', 'Electric front windows'),
    new EquipmentResponseDTO('EUL ', 'Electric mirrors'),
    new EquipmentResponseDTO('IM', 'Immobilizer'),
    new EquipmentResponseDTO('KM ', 'Manual air conditioning '),
    new EquipmentResponseDTO('PPK ', 'Steering wheel airbag '),
    new EquipmentResponseDTO('RD ', 'Radio '),
    new EquipmentResponseDTO('SP ', 'Fog lights'),
    new EquipmentResponseDTO('WK', 'Power steering'),
];

const individualVehicleEquipmentsList: EquipmentResponseDTO[] = [
    vehicleEquipments[0],
    vehicleEquipments[1],
    vehicleEquipments[2],
    vehicleEquipments[3],
];

export const getAllEquipmentsList = (): Promise<EquipmentResponseDTO[]> => {
    return Promise.all<EquipmentResponseDTO>(vehicleEquipments);
};

export const getVehicleEquipmentList = (vehicleId: string): Promise<EquipmentResponseDTO[]> => {
    console.log(vehicleId);
    return Promise.all<EquipmentResponseDTO>(individualVehicleEquipmentsList);
};

export function addEquipmentsToVehicle(vehicleId: string, vehicleEquipmentCodeArray: string[]): Promise<void> {
    return new Promise<void>(() => {
        const vehicleEquipmentsToAdd: EquipmentResponseDTO[] = [];

        vehicleEquipmentCodeArray.forEach((vehicleEquipmentCode: string) => {
            const vehicleEq: EquipmentResponseDTO | undefined = vehicleEquipments.find(
                (equipment: EquipmentResponseDTO) => equipment.code === vehicleEquipmentCode
            );
            if (vehicleEq) {
                vehicleEquipmentsToAdd.push(vehicleEq);
            }
        });

        if (vehicleEquipmentsToAdd.length) {
            individualVehicleEquipmentsList.push(...vehicleEquipmentsToAdd);
            console.log(`Add equipments ${vehicleEquipmentsToAdd} to vehicle ${vehicleId}`);
        } else {
            console.log(`Equipments with codes ${vehicleEquipmentsToAdd} not found`);
        }
    });
}

export function removeEquipmentFromVehicle(vehicleId: string, vehicleEquipmentCode: string): Promise<void> {
    return new Promise<void>(() => {
        const vehicleEquipmentToRemoveIndex = individualVehicleEquipmentsList.findIndex(
            (equipment: EquipmentResponseDTO) => equipment.code === vehicleEquipmentCode
        );
        if (vehicleEquipmentToRemoveIndex > -1) {
            individualVehicleEquipmentsList.splice(vehicleEquipmentToRemoveIndex, 1);
            console.log(`Remove equipment ${vehicleEquipmentCode} from vehicle ${vehicleId}`);
        } else {
            console.log(`Equipment with code ${vehicleEquipmentCode} is not assigned to vehicle ${vehicleId}`);
        }
    });
}
