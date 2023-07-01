export const protocol = 'http';

export const host = 'localhost';

export const port = 8080;

export const context = '';

export const appAddr: string = protocol + '://' + host + ':' + port + context;

export const endpoints = {
    homeEndpoint: 'http://localhost:3030/',
    localisationsEndpoint: appAddr + '/locations/all',
    authenticatedUserDataEndpoint: appAddr + '/authentication/user-data',
    carByIdEndpoint: (carId: number): string => appAddr + '/car-list/' + carId,
    getReservationStatusById: (reservationId: string): string => appAddr + '/reservations/' + reservationId,
    orderStatusById: (reservationId: string): string => 'http://localhost:3030/reservation-status/' + reservationId,
    allLocations: `${appAddr}/locations/all`,
    localisationByIdEndpoint: (localisationId: string): string => appAddr + '/locations/' + localisationId,
};
