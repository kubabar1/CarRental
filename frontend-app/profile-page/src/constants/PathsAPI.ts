export const protocol = 'http';

export const host = 'localhost';

export const port = 8080;

export const context = '/CarRental';

export const appAddr: string = protocol + '://' + host + ':' + port + context;

export const endpoints = {
    homeEndpoint: appAddr + '/',
};
