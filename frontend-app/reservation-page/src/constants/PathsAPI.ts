export const protocol = 'http';

export const host = 'localhost';

export const port = 8080;

export const context = '/CarRental';

export const appAddr: string = protocol + '://' + host + ':' + port + context;

export const endpoints = {
    homeEndpoint: appAddr + '/',
    localisationsEndpoint: appAddr + '/locations',
    currentUserDataEndpoint: appAddr + '/current-user',
    carListByCityEndpoint: (cityId: string): string => appAddr + '/car-list?city=' + cityId,
    carByIdEndpoint: (carId: number): string => appAddr + '/car-list/' + carId,
    getReservationStatusById: (reservationId: string): string => appAddr + '/reservations/' + reservationId,
    orderStatusById: (reservationId: string): string => 'http://localhost:3000/reservation-status/' + reservationId,
    localisationByIdEndpoint: (localisationId: string): string => appAddr + '/locations/' + localisationId,
};
