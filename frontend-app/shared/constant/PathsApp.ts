import { createAppAddr } from './PathUtils';

const FRONTEND_APP_PROTOCOL: string = process.env.FRONTEND_APP_PROTOCOL!;
const FRONTEND_APP_HOSTNAME: string = process.env.FRONTEND_APP_HOSTNAME!;
const FRONTEND_APP_PORT: number = (process.env.FRONTEND_APP_PORT as unknown) as number;
const FRONTEND_APP_CONTEXT: string | undefined = process.env.FRONTEND_APP_CONTEXT;

const FRONTEND_APP_ADDR = createAppAddr(
    FRONTEND_APP_PROTOCOL,
    FRONTEND_APP_HOSTNAME,
    FRONTEND_APP_PORT,
    FRONTEND_APP_CONTEXT
);

export const homePath = `${FRONTEND_APP_ADDR}/`;
export const loginPath = `${FRONTEND_APP_ADDR}/login`;
export const logoutPath = `${FRONTEND_APP_ADDR}/logout`;
export const profilePath = `${FRONTEND_APP_ADDR}/profile`;
export const registrationPath = `${FRONTEND_APP_ADDR}/registration`;
export const reservationPath = `${FRONTEND_APP_ADDR}/reservation`;
