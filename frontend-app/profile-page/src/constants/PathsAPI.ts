const PROTOCOL = 'http';

const HOST = 'localhost';

const PORT = 8080;

const CONTEXT = '';

const APP_ADDR = `${PROTOCOL}://${HOST}:${PORT}${CONTEXT}`;

const ADMIN_PATH = `${APP_ADDR}/admin`;

const USER_PATH = `${APP_ADDR}/user`;

const withId = (basePath: string, userId: string): string => {
    return `${basePath}/${userId}`;
};

export const GET_ADMIN_BOOKINGS_PATH = `${ADMIN_PATH}/bookings`;

export const GET_ADMIN_BOOKINGS_RESERVED_PATH = `${ADMIN_PATH}/bookings/reserved`;

export const GET_ADMIN_BOOKINGS_RENTED_PATH = `${ADMIN_PATH}/bookings/rented`;

export const RENT_ADMIN_BOOKING = (bookingId: string): string => withId(`${ADMIN_PATH}/bookings/rent`, bookingId);

export const CANCEL_ADMIN_BOOKING = (bookingId: string): string => withId(`${ADMIN_PATH}/bookings/cancel`, bookingId);

export const RETURN_ADMIN_BOOKING = (bookingId: string): string => withId(`${ADMIN_PATH}/bookings/return`, bookingId);

export const GET_BOOKINGS_AUDIT_LOGS_PATH = `${APP_ADDR}/bookings-audit-logs`;

export const GET_USER_BOOKINGS_PATH = `${USER_PATH}/bookings`;

export const GET_USER_BOOKINGS_RESERVED_PATH = `${USER_PATH}/bookings/reserved`;

export const GET_USER_BOOKINGS_RENTED_PATH = `${USER_PATH}/bookings/rented`;

export const CANCEL_USER_BOOKING = (bookingId: string): string => withId(`${USER_PATH}/bookings/cancel`, bookingId);
