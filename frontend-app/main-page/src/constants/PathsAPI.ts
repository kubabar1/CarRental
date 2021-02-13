export const protocol: string = 'http';

export const host: string = 'localhost';

export const port: number = 8080;

export const context: string = '/CarRental';

export const appAddr: string = protocol + '://' + host + ':' + port + context;

export const endpoints = {
    authenticationEndpoint: appAddr + '/userdata/is-authenticated',
    localisationsEndpoint: appAddr + '/locations',
    brandListEndpoint: appAddr + '/car-list-search/brands',
    brandModelsListEndpoint: (brand: string): string => appAddr + `/car-list-search/brands/models/${brand}`,
    cityListEndpoint: appAddr + '/car-list-search/brands/cities',
    bodyTypesListEndpoint: appAddr + '/car-list-search/body-types',
    coloursListEndpoint: appAddr + '/car-list-search/colours',
    carsPageableEndpoint: (page: number, pageCount: number): string =>
        appAddr + `/cars?page=${page}&number=${pageCount}`,
    starsCountEndpoint: (carId: number): string => appAddr + `/stars/${carId}`,
    commentsEndpoint: (carId: number, page: number, pageCount: number): string =>
        appAddr + `/comments/${carId}?page=${page}&number=${pageCount}`,
    carByIdEndpoint: (carId: number): string => appAddr + `/cars/${carId}`,
};
