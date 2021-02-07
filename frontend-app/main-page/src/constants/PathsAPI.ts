export const protocol: string = 'http';

export const host: string = 'localhost';

export const port: number = 8080;

export const context: string = '/CarRental';

export const appAddr: string = protocol + '://' + host + ':' + port + context;

export const endpoints = {
    authenticationEndpoint: appAddr + '/userdata/is-authenticated',
    localisationsEndpoint: appAddr + '/locations',
};