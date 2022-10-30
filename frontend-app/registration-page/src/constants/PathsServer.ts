export const protocol = 'http';

export const host = 'localhost';

export const port = 8080;

export const DEFAULT_START_PAGE = 0;

export const DEFAULT_PAGE_SIZE = 10;

export const context = '';

export const APP_ADDR: string = protocol + '://' + host + ':' + port + context;

export const USER_REGISTRATION_PATH = `${APP_ADDR}/registration/register-user`;
