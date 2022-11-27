const PROTOCOL = 'http';

const HOST = 'localhost';

const PORT = 8080;

const CONTEXT = '';

const APP_ADDR = `${PROTOCOL}://${HOST}:${PORT}${CONTEXT}`;

const ADMIN_PATH = `${APP_ADDR}/admin`;

const USER_PATH = `${APP_ADDR}/user`;

const withId = (basePath: string, id: string): string => {
    return `${basePath}/${id}`;
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

export const GET_VEHICLES_PATH = `${APP_ADDR}/vehicles`;

export const GET_LOCATIONS_PATH = `${APP_ADDR}/locations`;

export const GET_EQUIPMENTS_PATH = `${APP_ADDR}/equipments`;

export const GET_EQUIPMENTS_NOT_ASSIGNED_TO_VEHICLE_PATH = (vehicleId: string): string =>
    withId(`${APP_ADDR}/equipments/not-assigned`, vehicleId);

export const ADD_EQUIPMENT_TO_VEHICLE_PATH = (vehicleId: string): string =>
    withId(`${APP_ADDR}/equipments/add`, vehicleId);

export const REMOVE_EQUIPMENT_FROM_VEHICLE_PATH = (vehicleId: string): string =>
    withId(`${APP_ADDR}/equipments/remove`, vehicleId);

export const ADD_VEHICLE_PATH = `${APP_ADDR}/vehicles`;

export const UPDATE_VEHICLE_PATH = (vehicleId: string): string => withId(`${APP_ADDR}/vehicles`, vehicleId);

export const GET_UNAVAILABLE_VEHICLES_PATH = `${APP_ADDR}/vehicles/unavailable`;

export const GET_VEHICLE_BY_ID_PATH = (vehicleId: string): string => withId(`${APP_ADDR}/vehicles`, vehicleId);

export const GET_USERS_ROLES_PATH = `${APP_ADDR}/users-roles`;

export const GET_USER_ROLES_NOT_ASSIGNED_TO_USER_PATH = (userId: string): string =>
    withId(`${APP_ADDR}/users-roles/not-assigned`, userId);

export const GET_USERS_PATH = `${APP_ADDR}/users`;

export const GET_AUTHORIZED_USER_PATH = `${APP_ADDR}/authentication/user-data`;

export const UPDATE_USER_PATH = (userId: string): string => withId(`${APP_ADDR}/users`, userId);

export const UPDATE_AUTHORIZED_USER_PATH = `${APP_ADDR}/users/authorized`;

export const GET_USER_BY_ID_PATH = (userId: string): string => withId(`${APP_ADDR}/users`, userId);

export const ADD_ROLE_TO_USER_PATH = (userId: string): string => `${withId(`${APP_ADDR}/users`, userId)}/roles`;

export const GET_AUTHENTICATED_USER_DATA_PATH = `${APP_ADDR}/authentication/user-data`;

export const LOGOUT_PATH = `${APP_ADDR}/logout`;
