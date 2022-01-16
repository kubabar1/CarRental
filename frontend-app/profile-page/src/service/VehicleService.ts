import { VehicleResponseDTO } from '../model/VehicleResponseDTO';
import { VehicleStatusResponseDTO } from '../model/VehicleStatusResponseDTO';
import { VehicleStatCodeEnum } from '../model/VehicleStatCodeEnum';
import { VehiclePersistDTO } from '../model/VehiclePersistDTO';

export const getVehiclesList = (): Promise<VehicleResponseDTO[]> => {
    return Promise.all([
        new VehicleResponseDTO(
            '1',
            'Ford',
            'Mustang',
            142.21,
            'D2DS132',
            'Warszawa, ul. Testowa 21/2',
            new VehicleStatusResponseDTO(VehicleStatCodeEnum.AVI, 'Available'),
            false,
            'sedan',
            'petrol',
            250,
            'automatic',
            false,
            5,
            5,
            'black',
            true,
            'The Ford Mustang is a series of American automobiles manufactured by Ford.',
            2012,
            'ford_mustang_example.jpg'
        ),
        new VehicleResponseDTO(
            '2',
            'Ford',
            'Mustang',
            125.99,
            'FSR1321',
            'Wrocław, ul. Testowa 11/5',
            new VehicleStatusResponseDTO(VehicleStatCodeEnum.AVI, 'Available'),
            true,
            'sedan',
            'petrol',
            230,
            'manual',
            false,
            5,
            5,
            'blue',
            false,
            'The Ford Mustang is a series of American automobiles manufactured by Ford.',
            2014,
            'ford_mustang_example.jpg'
        ),
        new VehicleResponseDTO(
            '3',
            'Audi',
            'A4',
            88.12,
            'SHE41253',
            'Poznań, ul. Testowa 22/1',
            new VehicleStatusResponseDTO(VehicleStatCodeEnum.UAV, 'Unavailable'),
            false,
            'sedan',
            'gasoline',
            160,
            'manual',
            true,
            5,
            5,
            'gray',
            true,
            'Audi is a German automotive manufacturer of luxury vehicles.',
            2012,
            'ford_mustang_example.jpg'
        ),
    ]);
};

export function getVehicleById(vehicleId: string): Promise<VehicleResponseDTO> {
    return Promise.resolve<VehicleResponseDTO>(
        new VehicleResponseDTO(
            vehicleId,
            'Ford',
            'Mustang',
            125.99,
            'FSR1321',
            'Wrocław, ul. Testowa 11/5',
            new VehicleStatusResponseDTO(VehicleStatCodeEnum.AVI, 'Available'),
            true,
            'sedan',
            'petrol',
            230,
            'manual',
            false,
            5,
            5,
            'blue',
            false,
            'The Ford Mustang is a series of American automobiles manufactured by Ford.',
            2014,
            'ford_mustang_example.jpg'
        )
    );
}

export function updateVehicleData(vehicleId: string, vehicleUpdateDTO: VehiclePersistDTO): Promise<void> {
    return new Promise<void>(() => {
        console.log(vehicleId);
        console.log(vehicleUpdateDTO);
    });
}

export function addVehicle(vehicleAddDTO: VehiclePersistDTO): Promise<void> {
    return new Promise<void>(() => {
        console.log(vehicleAddDTO);
    });
}

export function getUnavailableVehiclesList(): Promise<VehicleResponseDTO[]> {
    return Promise.all([
        new VehicleResponseDTO(
            '2',
            'Ford',
            'Mustang',
            125.99,
            'FSR1321',
            'Wrocław, ul. Testowa 11/5',
            new VehicleStatusResponseDTO(VehicleStatCodeEnum.UAV, 'Unavailable'),
            true,
            'sedan',
            'petrol',
            230,
            'manual',
            false,
            5,
            5,
            'blue',
            false,
            'The Ford Mustang is a series of American automobiles manufactured by Ford.',
            2014,
            'ford_mustang_example.jpg'
        ),
        new VehicleResponseDTO(
            '3',
            'Audi',
            'A4',
            88.12,
            'SHE41253',
            'Poznań, ul. Testowa 22/1',
            new VehicleStatusResponseDTO(VehicleStatCodeEnum.UAV, 'Unavailable'),
            false,
            'sedan',
            'gasoline',
            160,
            'manual',
            true,
            5,
            5,
            'gray',
            true,
            'Audi is a German automotive manufacturer of luxury vehicles.',
            2012,
            'ford_mustang_example.jpg'
        ),
    ]);
}
