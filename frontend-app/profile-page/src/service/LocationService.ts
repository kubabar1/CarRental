import { LocationResponseDTO } from '../model/LocationResponseDTO';

export const getLocationsList = (): Promise<LocationResponseDTO[]> => {
    return Promise.all([
        new LocationResponseDTO('1', 'Poland', 'Warszawa', 'ul. Testowa 12/2', 'test1@test.com', '12345'),
        new LocationResponseDTO('2', 'Poland', 'Kraków', 'ul. Testowa 15/3', 'test2@test.com', '67891'),
        new LocationResponseDTO('3', 'Poland', 'Wrocław', 'ul. Testowa 22/12', 'test3@test.com', '23456'),
    ]);
};
